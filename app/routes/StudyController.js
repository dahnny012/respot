"use strict";

var Controller = require("./Controller");
var SRS = require("../models/SRS");



var ObjectId = require('mongodb').ObjectID;
var moment = require("moment");


function StudyController(){
    
}

StudyController.prototype = new Controller();




StudyController.prototype.stats = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var user = req.user;
    

    var controller = this;
    
    collection.findById(user._id,function(e,user){
        var flashcardIDs = user.history.map(function(e){
            return ObjectId(e.flashcardID);
        })
        controller.bulkByID(req,flashcardIDs,function(flashcards){
            for (var i = 0; i < user.history.length; i++) {
                user.history[i].flashcard = flashcards[i];
            }
            res.render("study/stats",{srs:user.history.reverse()});
        });
    });
}


StudyController.prototype.clearStats = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var user = req.user;
    var target = {"_id":user._id};
    var query = {"$set":{"history":[]}};
    collection.update(target,query);
    res.render("study/stats",{srs:false});
}

StudyController.prototype.evaluate = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var user = req.user;
    var deckID = req.params.deckID;
    var POST = req.body
    var srs = new SRS(POST);
    var answer = srs.answer;
    var target;
    var query;
    srs.newTimer(answer);
    
    
    // Adding to history.
    target = {"_id":user._id};
    query = {"history":srs};
    collection.update(target, {"$addToSet" : query});
    
    
    target = {"_id":user._id};
    target["srs."+deckID+".flashcardID"] = ObjectId(srs.flashcardID);
    query = {};
    query["srs."+deckID+".$.timer"] = srs.timer;
    query["srs."+deckID+".$.answer"] = answer;
    query["srs."+deckID+".$.correct"] = srs.correct;
    query["srs."+deckID+".$.wrong"] = srs.wrong;
    query["srs."+deckID+".$.recallCorrect"] = srs.recallCorrect;
    query["srs."+deckID+".$.recallWrong"] = srs.recallWrong;

    // mongo op courtesy of 
    // http://mongoblog.tumblr.com/post/21792332279/updating-one-element-in-an-array
    collection.update(target, {"$set" : query},function(e){
        var status = {"success":true,"message":e}
        res.json(status);
    });
}


// Returns the flashcards to study.
StudyController.prototype.study = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var user = req.session.user;
    var deckID = req.params.deckID;
    var controller = this;
    
    
    // Make sure its fresh
    collection.findById(user._id,function(e,doc){
        user = doc
        var queue = user.srs[deckID];
        var reviewQueue = controller.getReviewQueue(queue);

        if(reviewQueue.length == 0){
            res.redirect('/');
            return;
        }
        controller.retrieve(req,reviewQueue.map(function(e){return e.flashcardID}))
        .then(function(docs){
            shuffle(reviewQueue,docs);
            
            res.render("newStudy",{flashcards:JSON.stringify(docs),
                                srs:JSON.stringify(reviewQueue)});  
        })
    })
}


StudyController.prototype.getReviewQueue= function(queue){
    var reviewQueue = []
    // Grab up to when cards are too new.
    for(var i=0; i<queue.length; i++){
        if(queue[i].timer < new Date().valueOf())
            reviewQueue.push(queue[i])
    }
    return reviewQueue;
}

function shuffle(array,array2) {
    var counter = array.length, temp, index,temp2;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
        
        temp2 = array2[counter];
        array2[counter] = array2[index];
        array2[index] = temp2;
    }
}


module.exports = StudyController