"use strict";


// This is a wrapper for DeckMongo
function Deck(obj){
    this.name = "";
    this.description = "";
    this.owner = ""
    this.score = "";
    this.cards = [];
    this.favorites = [];
    this.type = "deck"
    
    for (var prop in obj) this[prop] = obj[prop];
}




module.exports = Deck





