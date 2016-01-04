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
    var user = req.session.user;
    

    var controller = this;
    
    collection.findById(user._id,function(e,user){
        var flashcardIDs = user.history.map(function(e){
            return ObjectId(e.flashcardID);
        })
        controller.retrieve(req,flashcardIDs).then(function(flashcards){
            for (var i = 0; i < user.history.length; i++) {
                user.history[i].flashcard = flashcards[i];
            }
            
            res.render("study/stats",{srs:user.history.reverse()});
            //collection.update(target,query);
        });
    });
}


StudyController.prototype.clearStats = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var user = req.session.user;
    var target = {"_id":user._id};
    var query = {"$set":{"history":[]}};
    collection.update(target,query);
    res.render("study/stats",{srs:false});
}

StudyController.prototype.evaluate = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var user = req.session.user;
    var deckID = req.params.deckID;
    var POST = req.body
    var srs = new SRS(POST);
    var answer = srs.answer;
    var target;
    var query;
    srs.newTimer(answer);
    
    console.log(srs);
    
    
    // Adding to history.
    target = {"_id":ObjectId(user._id)};
    query = {"history":srs};
    collection.update(target, {"$addToSet" : query});
    
    
    target = {"_id":ObjectId(user._id)};
    target["srs."+deckID+".flashcardID"] = ObjectId(srs.flashcardID);
    query = {};
    query["srs."+deckID+".$.timer"] = srs.timer;
    query["srs."+deckID+".$.answer"] = answer;
    query["srs."+deckID+".$.correct"] = srs.correct;
    query["srs."+deckID+".$.wrong"] = srs.wrong;
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


module.exports = StudyController