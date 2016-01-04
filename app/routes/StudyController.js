"use strict";

var Controller = require("./Controller");
var SRS = require("../models/SRS");



var ObjectId = require('mongodb').ObjectID;
var moment = require("moment");


function StudyController(){
    
}

StudyController.prototype = new Controller();




StudyController.prototype.evaluate = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var user = req.session.user;
    var deckID = req.params.deckID;
    var POST = req.body
    var srs = new SRS(POST);
    var answer = srs.answer;
    
    srs.newTimer(answer);
    
    var target = {"_id":ObjectId(user._id)};
    target["srs."+deckID+".flashcardID"] = ObjectId(srs.flashcardID);
    var query = {};
    query["srs."+deckID+".$.timer"] = srs.timer;
    
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
            res.render("study",{flashcards:JSON.stringify(docs),
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