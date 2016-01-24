"use strict"

var DeckController = require("./DeckController");
var quiz = require("../services/quizlet");
var async = require("async");
var SRS = require("../models/SRS")


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
        collection.insert(deck).then(function(deck){
            // Create a map entry
            var srsUpdate = {};
            var DeckIDtoSRS = "srs."+deck._id;
            srsUpdate[DeckIDtoSRS] = []
            
            // Add to decks + create SRS map entry
            var params = { 
                $addToSet: {decks: deck._id },
                $set:srsUpdate
            };
            
            // Add Deck to User Decks.
            collection.update(
            { _id: user._id },
               params
            ).then(function(){
                collection.insert(cards,function(e,docs){
                    var srsArr = docs.map(function(e){
                        return new SRS({
                            timer:new Date().valueOf(),
                            flashcardID:e._id
                        })
                    });
                
                    var cardIDs = docs.map(function(e){
                        return e._id;
                    })

                    async.parallel([
                        // Set SRS queue;
                        function(cb){
                            var query = {};
                            query["srs."+deck._id] = srsArr;
                            collection.update( { _id: user._id },{$set:query},cb)
                        },
                        
                        function(cb){
                        // Update Deck Cards;
                            collection.update(
                                { _id: deck._id },{ $set: {cards: cardIDs } },cb)
                            }],
                        function(err,data){
                            res.redirect("/");
                        }
                    );
                })
            });
        })
    }
}



module.exports = new QuizletDeckController();