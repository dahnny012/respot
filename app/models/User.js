"use strict";

function User(obj){
    this.id = "";
    this.username = "";
    this.score = "";
    this.decks = [];
    this.srs = [];
    this.type = "user";
    for (var prop in obj) this[prop] = obj[prop];
}



module.exports = User