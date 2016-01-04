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

DeckController.prototype.index = function(req,res){
    var POST = req.body
    var db = req.db;
    var collection = db.get('respot');
    var user = req.session.user;
    var deckID = req.params.deckID;
    var self = this;
    
    collection.findById(user._id,function(e,user){
        collection.findById(deckID,function(e,deck){
            var flashcardIDs = user.srs[deckID].map(function(e){
                return e.flashcardID;
            });
            
            self.retrieve(req,flashcardIDs).then(function(cards){
                for (var i = 0; i < cards.length; i++) {
                    cards[i].srs = user.srs[deckID][i];
                }
                deck.cards = cards;
                res.render("deck/index",{'deck':deck});
            })
        })
    })
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
            timer:new Date().valueOf(),
            flashcardID:card._id
        })
        
        async.parallel([
        function(cb){
            // Put into the deck
            collection.update(
                { _id: deckID },
                { $addToSet: {cards: card._id } },cb)
        },
        
        function(cb){
            // Update user srs queue
            collection.update( { _id: user._id },StudyQueueAdd(deckID,srs),cb)
        }],
        function(err,data){ res.json({"success":true}); })
    })
}
DeckController.prototype.deleteDeck = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var POST = req.body;
    var user = req.session.user
    // Delete a deck...

    var controller = this;
    collection.find(POST.deckID,function(e,deck){
        // Delete all the cards
        // Get all the IDs.
        var flashcardIDs =deck.cards.map(function(e){
            return e._id;
        })
        controller.delete(req,flashcardIDs);
        
        // Delete the deck
        collection.remove({"_id":ObjectId(POST.deckID)});
        
        // Delete the entry for the user
        var target = {"_id":ObjectId(user._id)};
        var query = {};
        query["srs."+POST.deckID] = "";
        collection.update(target,{$unset:query})
    })
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
            res.redirect("/");
        });
    })
}


// Helpers 
function StudyQueueAdd(deckID,srs){ 
    var srsUpdate = {};
    var DeckIDtoSRS = "srs."+deckID;
    srsUpdate[DeckIDtoSRS] = srs
    var params = { $push:srsUpdate };
    return params
}



module.exports = DeckController;