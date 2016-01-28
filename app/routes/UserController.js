"use strict";

var Controller = require("./Controller");
var User = require("../models/User");
var Registration = require("../models/Registration");


// Factories
var DeckController= require("./DeckController");
var StudyControllerFactory = require("./StudyController");


var StudyController = new StudyControllerFactory();
var async = require("async");

//For security!
var bcrypt = require('bcrypt-nodejs');

var LOGINERROR = "Wrong Username/Password. Maybe it doesn't exist?";
var REGISTERERROR = "Account already exists. Please try another username.";

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
    var db = req.db;
    var collection = db.get('respot');
    var controller = this;
    collection.find({"username":POST.user},function(e,docs){
        if(docs.length == 0){
            // Creates a Model.Registration
            collection.insert(new Registration({
                username:POST.user,
                password:UserController.prototype.generateHash(POST.pass)
            }));
            
            
            // Creates a Model.User
            collection.insert(new User({username:POST.user}))
            .then(function(doc){
                SESSION.user = doc;
                res.json({"success":true}); 
            })
        }else{
            //Failed to register
            res.json({"success":false, "error": REGISTERERROR});
        }
    });
}

UserController.prototype.login = function(req,res,body){
    var POST = req.body;
    var SESSION = req.session;
    var db = req.db;
    var collection = db.get('respot');
    var self = this;
    var registration = {"username":POST.user, "type": "registration"}
    var user = {"username":POST.user,"type":"user"}
    collection.find(registration,function(e,docs){
        // Found Login, check password if hashes match
        //TODO: somehow calling self.validpassword gives undefined (null error). 
        if(docs.length == 1 && UserController.prototype.validPassword(docs[0].password, POST.pass) ){
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

UserController.prototype.generateHash = function(password) {
    //salt + hash
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserController.prototype.validPassword = function(stored, input) {
    return bcrypt.compareSync(input, stored);
};

module.exports = UserController;

