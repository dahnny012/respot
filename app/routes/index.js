var express = require('express');
var router = express.Router();

// Factories
var UserControllerFactory = require("./UserController");
var DeckControllerFactory = require("./DeckController");
var StudyControllerFactory = require("./StudyController");
var CardControllerFactory = require("./CardController");


// Singletons not really.

var UserController = new UserControllerFactory();
var DeckController = new DeckControllerFactory();
var StudyController = new StudyControllerFactory();
var CardController = new CardControllerFactory();


// Courtesy of http://stackoverflow.com/a/11260389
var MongoIDRegex = '([0-9a-f]{24})/';


router.get('/deck/:deckID'+MongoIDRegex, function(req, res, next) {
    if(req.session.user) res.render("index");
    else res.redirect("/");
});

router.get('/deck/new', function(req, res, next) {
    if(req.session.user) res.render('deck/new');
    else res.redirect("/");
});

router.post('/deck/new', function(req, res, next) {
    if(req.session.user) DeckController.newDeck(req,res);
    else res.redirect("/");
});

router.get('/deck/add/:deckID'+MongoIDRegex, function(req, res, next) {
    // TODO is this the owner?!?
    // Check if current user has the deck in their list of decks
    if(req.session.user) res.render("deck/add")
    else res.redirect("/");
});

router.post('/deck/add/:deckID'+MongoIDRegex, function(req, res, next) {
    // TODO is this the owner?!?
        // Check if current user has the deck in their list of decks
    if(req.session.user) DeckController.addCard(req,res);
    else res.redirect("/")
});

router.get('/study', function(req, res, next) {
    res.render('study');
});

router.get('/study/:deckID'+MongoIDRegex, function(req, res, next) {
    // TODO is this the owner?!?
        // Check if current user has the deck in their list of decks
    if(req.session.user) StudyController.study(req,res);
    else res.redirect("/")
});



router.get('/user/login', function(req, res, next) {
    res.render('user/login');   
});

router.post('/user/login',UserController.login);

router.get('/user/register', function(req, res, next) {
    res.render("user/register",{"session":req.session});
});

router.post('/user/register',UserController.register);

router.get('/card/:'+MongoIDRegex, function(req, res, next) {
    if(req.session.user) res.end("Yah ok.");
    else res.redirect("/");
});

router.get('/', function(req, res, next) {
  // User is Not Logged in.
  if(!req.session.user) res.render('index');
  else UserController.index(req,res);
});

module.exports = router;
