"use strict";

var Controller = require("./Controller");
var User = require("../models/User");
var Registration = require("../models/Registration");


// Factories
var DeckController= require("./DeckController");
var StudyControllerFactory = require("./StudyController");


var StudyController = new StudyControllerFactory();
var async = require("async");

var LOGINERROR = "Wrong Username/Password. Maybe it doesn't exist?";
var REGISTERERROR = "Account already exists. Please try another name.";

// The router contains the db connection among other things
// See Monk.js

function UserController(){

}


UserController.prototype = new Controller();

// At this point they should be logged in.
UserController.prototype.index = function(req,res){
    var session = req.session.user;
    var db = req.db;
    var collection = db.get('respot');

    collection.findById(session._id,function(e,user){
        session = user
        // Retrieve the deck.
        DeckController.retrieve(req,user.decks).then(function(decks){
            user.decks = decks;
            user.decks.forEach(function(e){
                user.srs[e._id] = StudyController.getReviewQueue(user.srs[e._id])
            })
            res.render("index",{user:user}); 
        })
    });
}

UserController.prototype.update = function(req,user){
    
}
UserController.prototype.register = function(req,res,body){
    var POST = req.body;
    var SESSION = req.session;
    var passport = req.passport;
    
    console.log("register subroute called, body parsing: ", req.body);
   
    passport.authenticate('local', {
        successRedirect : function() { console.log("YAY"); res.json({"success":true}); }, // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    });
}
// old login, does not use passport.
UserController.prototype.login = function(req,res,body){
    var POST = req.body;
    var SESSION = req.session;
    var db = req.db;
    var collection = db.get('respot');
    var self = this;
    var registration = {"username":POST.user,"password":POST.pass}
    var user = {"username":POST.user,"type":"user"}
    collection.find(registration,function(e,docs){
        // Login Successful
        if(docs.length == 1){
            collection.find(user,function(e,docs){
                SESSION.user = docs[0];
                res.json({"success":true});
            })
        }else{
        // Login Unsuccessful
        res.json({success:false,"error":LOGINERROR});
        }
    });
}

//courtesy of http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
//checks if user is Authenticated, if so call next, else kick them back to homepage
UserController.prototype.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

UserController.prototype.logout = function(req, res, body){
    req.logout();
    res.redirect('/');
}

module.exports = UserController;

