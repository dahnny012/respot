"use strict";

var Controller = require("./Controller");
var SRS = require("../models/SRS");

function StudyController(){
    
}

StudyController.prototype = new Controller();




StudyController.prototype.evaluate = function(req,res){
    var db = req.db;
    var collection = db.get('respot');
    var user = req.session.user;
    var deckID = req.params.deckID;
    var POST = req.body
    var srs = new SRS(POST.srs);
    var answer = POST.answer;
    
    srs.newTimer(answer);
    
    var target = {"_id":user._id};
    var query = {};
    query["srs."+deckID+".$.timer"] = srs.timer;
    
    // mongo op courtesy of 
    // http://mongoblog.tumblr.com/post/21792332279/updating-one-element-in-an-array
    collection.update(target, {"$set" : query},function(e,doc){
        var status = {"success":e  != true}
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
        
    
        controller.retrieve(req,reviewQueue.map(function(e){return e.flashcardID}))
        .then(function(docs){
            res.render("study",{flashcards:JSON.stringify(docs),
                                srs:JSON.stringify(reviewQueue)});  
        })
    })
}


StudyController.prototype.getReviewQueue= function(queue){
    var reviewQueue = []
    queue.sort(function(a,b){
        return new Date(a.timer) - new Date(b.timer);
    });
    
    // Grab up to when cards are too new.
    for(var i=0; i<queue.length; i++){
        if(new Date(queue[i].timer) > new Date())
            break;
        reviewQueue.push(queue[i])
    }
    return reviewQueue;
}


module.exports = StudyController