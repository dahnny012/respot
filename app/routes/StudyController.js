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
    var srs = new SRS(req.params.srs);
    
    
    
    res.json({success:"true"})
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
        var reviewQueue = []
        user = doc
        var queue = user.srs[deckID];
        // Sort it again
        queue.sort(function(a,b){
            return new Date(a.timer) - new Date(b.timer);
        });
    
        // Grab up to when cards are too new.
        for(var i=0; i<queue.length; i++){
            if(new Date(queue[i].timer) > new Date())
                break;
            reviewQueue.push(queue[i])
        }
    
        controller.retrieve(req,reviewQueue.map(function(e){return e.flashcardID}))
        .then(function(docs){
            res.render("study",{flashcards:docs});  
        })
    })
}



module.exports = StudyController