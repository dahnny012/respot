"use strict";

function Card(obj){
    this.front = Side;
    this.back = Side;
    this.owner = "";
    this.type="card"
    for (var prop in obj) this[prop] = obj[prop];
}

var Side = "Some Html/Text"



module.exports = Card;