"use strict";

var Controller = require("./Controller");

var Deck = require("../models/Deck")

function DeckController(){
    
}



DeckController.prototype = Controller;
DeckController.prototype.index = function(){
    
}
DeckController.prototype.retrieve = function(req,ids){
    console.log("ids");
    console.log(ids);
    var db = req.db;
    var collection = db.get('respot');
    return collection.find({
        '_id': { $in: ids}
    })
}
    
DeckController.prototype.update = function(){
    
}
DeckController.prototype.delete = function(){
    
}
DeckController.prototype.newDeck = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var POST = req.body;
    var user = req.session.user
    
    //Create the deck
    collection.insert(new Deck({
        name:POST.name,
        description:POST.description,
        owner:user.username
    })).then(function(doc){
    // Link the deck to the current user.
        collection.update(
           { _id: user._id },
           { $addToSet: {decks: doc._id } }
        ).then(function(){
            // Finish up and head back.
            res.redirect("/");
        });
    })
}


module.exports = DeckController;