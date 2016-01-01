"use strict";

function Flashcard(obj){
    this._id = "";
    this.front = Side();
    this.back = Side();
    for (var prop in obj) this[prop] = obj[prop];
}

function Side(){
    
}



module.exports = Flashcard;