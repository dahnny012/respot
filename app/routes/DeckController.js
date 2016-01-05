"use strict";

var Controller = require("./Controller");

var Deck = require("../models/Deck");
var Card = require("../models/Card");
var SRS = require("../models/SRS");
var ObjectId = require('mongodb').ObjectID;
var async = require("async");

var gre = require("../models/GRE");
var DictionaryFactory = require("../services/dictionaryAPI");

var dict = new DictionaryFactory();
var cindict = new DictionaryFactory("ldec");

var MAXSIZE = 4102;

function DeckController(){
    
}


function randomNumber(){
    return Math.floor(Math.random() * MAXSIZE);
}


DeckController.prototype = new Controller();

DeckController.prototype.index = function(req,res){
    var POST = req.body
    var db = req.db;
    var collection = db.get('respot');
    var user = req.session.user;
    var deckID = req.params.deckID;
    var self = this;
    
    collection.findById(user._id,function(e,user){
        collection.findById(deckID,function(e,deck){
            var flashcardIDs = user.srs[deckID].map(function(e){
                return e.flashcardID;
            });
            
            self.retrieve(req,flashcardIDs).then(function(cards){
                for (var i = 0; i < cards.length; i++) {
                    cards[i].srs = user.srs[deckID][i];
                }
                deck.cards = cards;
                res.render("deck/index",{'deck':deck});
            })
        })
    })
}


DeckController.prototype.addCard = function(req,res){
    var POST = req.body
    var db = req.db;
    var collection = db.get('respot');
    var user = req.session.user;
    var deckID = req.params.deckID;
    
    // Create a card
    var card; 
    
    
    function dontQuit(cb){
        var word = gre[randomNumber()];
        dict.search([word],function(results){
            if(results.length >= 1){
                console.log(results);
                cb(results[0]);
            }
            else{
                dontQuit(cb);
            }
        })
    }
    // Lol who needs a builder a pattern.
    if(POST.subtype == "gre" || POST.subtype == "eng"){
        dontQuit(function(pearson){
            card = new Card({
                front:pearson.word,
                back:pearson.def,
                owner:user.username
            })
            toDB(card);
        })
    }
    else if(POST.subtype == "cn"){
        
    }
    else{
        card = new Card({
            front:POST.front,
            back:POST.back,
            owner:user.username
        });
        toDB(card)
    }
    
    
        
    function toDB(card){
        // Put the card into the DB
        collection.insert(card,function(e,card){
            var srs = new SRS({
                timer:new Date().valueOf(),
                flashcardID:card._id
            })
            
            async.parallel([
            function(cb){
                // Put into the deck
                collection.update(
                    { _id: deckID },
                    { $addToSet: {cards: card._id } },cb)
            },
            
            function(cb){
                // Update user srs queue
                collection.update( { _id: user._id },StudyQueueAdd(deckID,srs),cb)
            }],
            function(err,data){ res.json({"success":true}); })
        })
    }
}


DeckController.prototype.deleteDeck = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var POST = req.body;
    var user = req.session.user
    // Delete a deck...

    var controller = this;
    collection.find(POST.deckID,function(e,deck){
        // Delete all the cards
        // Get all the IDs.
        var flashcardIDs =deck.cards.map(function(e){
            return e._id;
        })
        controller.delete(req,flashcardIDs);
        
        // Delete the deck
        collection.remove({"_id":ObjectId(POST.deckID)});
        
        // Delete the entry for the user
        var target = {"_id":ObjectId(user._id)};
        var query = {};
        query["srs."+POST.deckID] = "";
        collection.update(target,{$unset:query})
    })
}
DeckController.prototype.newDeck = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var POST = req.body;
    var user = req.session.user
    
    //Create the deck
    var deck = new Deck({
        name:POST.name,
        description:POST.description,
        owner:user.username
    })
    
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
        
        // Gogo mongo
        collection.update(
        { _id: user._id },
           params
        ).then(function(){
            res.redirect("/");
        });
    })
}

// Here be Dragons. Stay safe. GOGO mongo.
DeckController.prototype.newPearsonDeck=function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var POST = req.body;
    var user = req.session.user
    
    //Create a Pearson Deck
    var deck = new Deck({
        name:POST.name,
        description:POST.description,
        owner:user.username,
        subtype:POST.subtype
    })

    var map = [];
    function randomGREWords(amount){
        var words =[];
        while(words.length < amount){
            var rando = gre[Math.floor(Math.random() * MAXSIZE)];
            if(map.indexOf(rando) == -1){
                map.push(rando);
                words.push(rando);
            }
        }
        return words;
    } 
    
    function randomEngWords(amount){
        
    }
    
    function randomChineseWords(){
        
    }

    
    var buffer = []
    POST.number = POST.number || 20;
    function searchDictionary(){
        // TODO change what type of cards that can be generated.
        var cardsToGenerate = randomGREWords(POST.number);
        dict.search(cardsToGenerate,function(words){
            buffer = buffer.concat(words);
            if(buffer.length < POST.number)
                searchDictionary();
            else
                addToDB(buffer.slice(0,20));
        })
    }
    
    function addToDB(words){
        var cards = words.map(function(e){
            return new Card({
                front:e.word,
                back:e.def,
                owner:user.username
            });
        })
        
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
                            res.json({"success":err == null})
                        }
                    );
                })
            });
        })
    }
    searchDictionary();
}


// Helpers 
function StudyQueueAdd(deckID,srs){ 
    var srsUpdate = {};
    var DeckIDtoSRS = "srs."+deckID;
    srsUpdate[DeckIDtoSRS] = srs
    var params = { $push:srsUpdate };
    return params
}



module.exports = DeckController;