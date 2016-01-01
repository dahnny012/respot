var express = require('express');
var router = express.Router();

// Factories
var UserControllerFactory = require("./UserController");
var DeckControllerFactory = require("./DeckController");
var StudyControllerFactory = require("./StudyController");
var FlashcardControllerFactory = require("./FlashcardController");


// Singletons not really.


var DeckController = new DeckControllerFactory();
var StudyController = new StudyControllerFactory();
var FlashcardController = new FlashcardControllerFactory();





// Courtesy of http://stackoverflow.com/a/11260389
router.get('/deck/:mongoId([0-9a-f]{24})', function(req, res, next) {
    if(req.session.user)
        res.end("Yah ok.");
    else
        res.redirect("/");
});

router.get('/deck/new', function(req, res, next) {
    if(req.session.user)
        res.render('deck/new');
    else
        res.redirect("/");
});

router.post('/deck/new', function(req, res, next) {
    if(req.session.user)
        DeckController.newDeck(req,res);
    else
        res.redirect("/");
});


router.get('/study', function(req, res, next) {
    StudyController
    res.render('study', { title: 'Express' });
});

router.get('/study',function(req,res,next){
    res.render('study',{title:'Express'});    
})

router.get('/user/home', function(req, res, next) {
    var UserController = new UserControllerFactory();
    UserController.get(req,res,next);
});


router.get('/user/login', function(req, res, next) {
    var POST = req.body;
    res.render('user/login',{title:'Express'});   
});

router.post('/user/login', function(req, res, next) {
    var UserController = new UserControllerFactory();
    var POST = req.body;
    UserController.login(req,res);
});




router.get('/user/register', function(req, res, next) {
    res.render("user/register",{"session":req.session});
});

router.post('/user/register', function(req, res, next) {
    var UserController = new UserControllerFactory();
    UserController.create(req,res);
});


router.get('/flashcard', function(req, res, next) {
    FlashcardController
});



router.get('/', function(req, res, next) {
    var UserController = new UserControllerFactory();
  // User is Not Logged in.
  if(!req.session.user)
    res.render('index', { title: 'Respot' });
  else
    UserController.index(req,res);
});

module.exports = router;
