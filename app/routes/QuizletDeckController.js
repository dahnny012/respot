"use strict"


// lol what is life.
var DeckController = require("./DeckController");
var quiz = require("../services/quizlet");
var async = require("async");
var SRS = require("../models/SRS")


function QuizletDeckController(){
    
}

QuizletDeckController.prototype.search = function(req,res){
    var term = req.query.q;
    var page = req.query.page;
    quiz.searchSets(term,page).then(function(data,err){
        var decks = data.body;
        res.json(decks);
    })
}

function decorate(user,deck,cards){
    deck.owner = user.username;
    deck.subtype = "quizlet";
    
    cards.forEach(function(e){
        e.owner = user.username;
    })
        
}
QuizletDeckController.prototype.create=function(req,res){
    var id = req.params.id;
    var db = req.db;
    var collection = db.get('respot');
    var POST = req.body;
    var user = req.session.user
    
    quiz.getDeck(id).then(function(deckAndTerms,err){
        var deck = deckAndTerms.deck;
        var cards = deckAndTerms.cards;
        decorate(user,deck,cards);    
        addToDB(deck,cards);
    })
    
    function addToDB(deck,cards){
        DeckController.insertDeck(user,deck,collection).then(function(){
            DeckController.insertCards(user,deck,cards,res,collection);
        });
    }
}



module.exports = new QuizletDeckController();