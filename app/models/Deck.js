"use strict";


// This is a wrapper for DeckMongo
function Deck(obj){
    this.id = "";
    this.username = "";
    this.score = "";
    this.queue = [];
    this.cards = [];
    this.favorites = [];
    
    for (var prop in obj) this[prop] = obj[prop];
}




module.exports = Deck





