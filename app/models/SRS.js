var MILISECS = 1
var SECS = 1000 * MILISECS;
var MINUTE = 60 * SECS;
var HOUR = 60 * MINUTE
var DAY = 24 * HOUR;


function SRS(obj){
    this.timer = new Date().valueOf();
    this.flashcardID = "";
    this.answer = false;
    this.correct = 0;
    this.wrong = 0;
    this.type = "srs"
    for (var prop in obj) this[prop] = obj[prop];
}



// For now answer is a boolean.
SRS.prototype.newTimer =function(answer){
    this.answer = answer
    if(answer == 'true'){
        var coef = (this.correct - this.wrong);
        if(coef < 1){
            coef = 1;
        }
        this.correct++;
        this.timer = new Date().valueOf()  + coef * HOUR;
    }
    else{ 
        this.wrong++;
        this.timer =  new Date().valueOf()  + MINUTE;
    }
}

module.exports = SRS;