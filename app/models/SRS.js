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
    this.recallCorrect = 0;
    this.recallWrong = 0;
    for (var prop in obj) this[prop] = obj[prop];
}



// For now answer is a boolean.
SRS.prototype.newTimer =function(answer){
    if(this.subtype === undefined)
        this.subtype="recognize";

    this.answer = answer
    if(answer == 'true'){
        this.updateScore("+");
        this.timer = this.algorithm();
    }
    else{ 
        this.updateScore("-");
        this.timer =  this.algorithm();
    }
}

SRS.prototype.updateScore = function(op){
    var self = this;
    var handlers = {
        "+recognize":function(){
            self.correct++;
        },
        "-recognize":function(){
            self.wrong++;
        },
        "+recall":function(){
            self.recallCorrect++;
        },
        "-recall":function(){
            self.recallWrong++;
        },
    }
    var key = op+this.subtype;
    handlers[key]();
}

// SRS Algorithm
SRS.prototype.algorithm = function(){
    var self = this;
    var targetCorrect;
    var targetWrong;
    if(self.correct <= self.recallCorrect){
        targetCorrect = self.correct;
        targetWrong = self.wrong;
    }else{
        targetCorrect = self.recallCorrect;
        targetWrong = self.recallWrong
    }
    
    var coef = targetCorrect-targetWrong;
    if(coef < 0)
        coef = 0;
    var timer = new Date().valueOf() + (4 * HOUR * coef);
    return timer;
}

module.exports = SRS;