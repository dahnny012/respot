"use strict";

var Controller = require("./Controller");
var User = require("../models/User");


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
    var session = req.user;
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

UserController.prototype.register = function(req,res,next){
    var POST = req.body;
    var passport = req.passport;
    
    passport.authenticate('local')(req, res,function(err){
        if(err)
            res.json({"success":false, "error": err});
        else
            res.json({"success":true});
    });
}

UserController.prototype.login = function(req,res,next){
    var POST = req.body;
    var passport = req.passport;
    
    passport.authenticate('local-login')(req, res,function(err){
        console.log(err);
        if(err)
            res.json({"success":false, "error": err});
        else
            res.json({"success":true});
    });
}

//courtesy of http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
//checks if user is Authenticated, if so call next, else kick them back to homepage
UserController.prototype.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.render('index');
}

UserController.prototype.logout = function(req, res, body){
    req.logout();
    res.redirect('/');
}

module.exports = UserController;

