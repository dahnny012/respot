"use strict"

var DeckController = require("./DeckController");
var quiz = require("../services/quizlet.js");


function QuizletDeckController(){
    
}

QuizletDeckController.prototype = new DeckController();



QuizletDeckController.prototype.search = function(req,res){
    var term = req.query.q;
    var page = req.query.page;
    quiz.searchSets(term,page).then(function(data,err){
        var decks = data.body;
        res.json(decks);
    })
}


module.exports = new QuizletDeckController();