var SECS = 1;
var MINUTE = 60;
var HOUR = 3600;
var DAY = 24*3600;


function SRS(obj){
    this.timer = new Date();
    this.flashcardID = "";
    this.type = "srs"
    for (var prop in obj) this[prop] = obj[prop];
}



// For now answer is a boolean.
SRS.prototype.newTimer =function(answer){
    if(answer) 
        this.timer = new Date() + 6 * HOUR
    else 
        this.time =  new Date() + 5 * MINUTE
}

module.exports = SRS;