//For Passport middleware, used for authentication 
// .. also configures passport.

"use strict";

// load modules we need
var bcrypt = require("bcrypt-nodejs");

var LocalStrategy = require("passport-local").Strategy;
var Registration = require("../models/Registration");

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/mongo');

function Auth() {
    
}

//Loads all strategies needed.
Auth.prototype.config = function(passport) {
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        var collection = db.get('respot');
    
        collection.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use('local', localSignUpStrategy);
    console.log("passport configured.... ");
}


// --- STRATEGIES --- //
var localSignUpStrategy = new LocalStrategy(
    {
        // by default, local stratey uses username and password, we will override with email
        usernameField : 'user',
        passwordField : 'pass',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        
        console.log("enter strategy "); //never hits here. :(

        // asynchronous. User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Registration.findOne(req, { 'username' :  username }, function(err) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            else {

                // if there is no user with that email
                // create the user and set local credentials
                var newUser = new Registration({ 'username' : username, 'password' : password });

                // save the user
                newUser.save(req, function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
        });
    });


module.exports = new Auth();