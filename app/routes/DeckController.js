"use strict";

var Controller = require("./Controller");

var Deck = require("../models/Deck");
var Card = require("../models/Card");
var SRS = require("../models/SRS");
var ObjectId = require('mongodb').ObjectID;

var async = require("async");

function DeckController(){
    
}



DeckController.prototype = new Controller();

DeckController.prototype.index = function(){
    
}
    
DeckController.prototype.addCard = function(req,res){
    var POST = req.body
    var db = req.db;
    var collection = db.get('respot');
    var user = req.session.user;
    var deckID = req.params.deckID;
    
    // Create a card
    var card = new Card({
        front:POST.front,
        back:POST.back,
        owner:user.username
    });
    
    // Put the card into the DB
    collection.insert(card,function(e,card){
        var srs = new SRS({
            timer:new Date(),
            flashcardID:card._id
        })
        
        async.parallel([
        function(cb){
            // Put into the deck
            collection.update(
                { _id: deckID },
                { $addToSet: {cards: card._id } },function(){
                    // Do it for the client
                    user.decks.forEach(function(e){
                      if(e._id == deckID) e.cards.push(card._id)
                    })
                    cb();
            })
        },
        
        function(cb){
            // Update user srs queue
            collection.update( { _id: user._id },StudyQueueAdd(deckID,card._id),
            function(){
                user.srs[deckID].push(srs);
                cb()
            })
        }],
        
        function(err,data){ res.json({"success":true}); })
    })
}
DeckController.prototype.delete = function(){
    
}
DeckController.prototype.newDeck = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var POST = req.body;
    var user = req.session.user
    
    //Create the deck
    var deck = new Deck({
        name:POST.name,
        description:POST.description,
        owner:user.username
    })
    
    collection.insert(deck).then(function(deck){
        // Create a map entry
        var srsUpdate = {};
        var DeckIDtoSRS = "srs."+deck._id;
        srsUpdate[DeckIDtoSRS] = []
        
        // Add to decks + create SRS map entry
        var params = { 
            $addToSet: {decks: deck._id },
            $set:srsUpdate
        };
        
        // Gogo mongo
        collection.update(
        { _id: user._id },
           params
        ).then(function(){
            // Apply changes to current user
            user.srs[deck._id] = [];
            user.decks.push(deck._id);
            res.redirect("/");
        });
    })
}


// Helpers 
function StudyQueueAdd(deckID,cardID){ 
    var srsUpdate = {};
    var DeckIDtoSRS = "srs."+deckID;
    srsUpdate[DeckIDtoSRS] = cardID
    var params = { 
        $addToSet:srsUpdate
    };
    
    return params
}



module.exports = DeckController;