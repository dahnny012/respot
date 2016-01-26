//Controller for Passport middleware, used for authentication 
// .. also configures passport.

"use strict";

var Controller = require("./Controller");

// load modules we need
var bcrypt = require("bcrypt-nodejs");

var LocalStrategy = require("passport-local").Strategy;
var Registration = require("../models/Registration");

function AuthController() {
    
}

AuthController.prototype = new Controller();

//Loads all strategies needed.
AuthController.prototype.config = function(passport) {
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Registration.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use('local-signup', AuthController.prototype.localSignUp);
    
}

//courtesy of http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
//checks if user is Authenticated, if so call next, else kick them back to homepage
AuthController.prototype.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

AuthController.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
AuthController.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// --- STRATEGIES --- //
AuthController.prototype.localSignUp = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Registration.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            // at this to done if we use flash: req.flash('signupMessage', 'That email is already taken.')
            if (user) {
                return done(null, false);
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new Registration();

                // set the user's local credentials
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
        });
    });



module.exports = AuthController;