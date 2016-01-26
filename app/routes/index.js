var express = require('express');
var router = express.Router();

// Factories
var UserControllerFactory = require("./UserController");
var DeckController = require("./DeckController");
var StudyControllerFactory = require("./StudyController");
var CardControllerFactory = require("./CardController");



// Singletons not really. Iono im a pleb
var UserController = new UserControllerFactory();
var StudyController = new StudyControllerFactory();
var CardController = new CardControllerFactory();
var QuizletDeckController=  require("./QuizletDeckController");
var AuthController = require("./AuthController");


// Courtesy of http://stackoverflow.com/a/11260389
var MongoIDRegex = '([0-9a-f]{24})/';


/*
==========
Decks
=========
*/

router.get('/deck/:deckID'+MongoIDRegex, function(req, res, next) {
    if(req.session.user) DeckController.index(req,res);
    else res.redirect("/");
});

router.post('/deck/new', function(req, res, next) {
    if(req.session.user) DeckController.newDeck(req,res);
    else res.redirect("/");
});

router.post('/deck/pearson', function(req, res, next) {
    if(req.session.user) DeckController.newPearsonDeck(req,res);
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
    else res.redirect("/");
});


router.get('/deck/quizlet/search/', QuizletDeckController.search);

router.get('/deck/quizlet/create/:id', QuizletDeckController.create);



/*
==========
Study
=========
*/

router.post('/study/:deckID'+MongoIDRegex, function(req, res, next) {
    // TODO is this the owner?!?
        // Check if current user has the deck in their list of decks
    if(req.session.user) StudyController.evaluate(req,res);
    else res.redirect("/");
});

router.get('/study/:deckID'+MongoIDRegex, function(req, res, next) {
    // TODO is this the owner?!?
        // Check if current user has the deck in their list of decks
    if(req.session.user) StudyController.study(req,res);
    else res.redirect("/");
});

router.get('/study', function(req, res, next) {
    res.render("newStudy",{});
});

router.get('/study/stats', function(req,res,next){
    if(req.session.user){
        if(req.query.clear){
            console.log("Clearing Timline");
            StudyController.clearStats(req,res);
        }else{
            StudyController.stats(req,res);
        }
    }
    else 
        res.redirect("/");
});



/*
==========
User
=========
*/
router.get('/user/login', function(req, res, next) {
    res.render('/');   
});

router.post('/user/login',UserController.login);

router.get('/user/register', function(req, res, next) {
    res.render("user/register",{"session":req.session});
});

router.post('/user/register',UserController.register);

router.get('/user/logout', UserController.logout);

/*
==========
Cards
=========
*/

router.get('/card/:'+MongoIDRegex, function(req, res, next) {
    if(req.session.user) res.end("Yah ok.")
    else res.redirect("/");
});

router.post('/card/update/:cardID'+MongoIDRegex, function(req, res, next) {
    if(req.session.user) CardController.update(req,res);
    else res.redirect("/");
});

router.post('/card/delete/:cardID'+MongoIDRegex, function(req, res, next) {
    if(req.session.user) CardController.delete(req,res);
    else res.redirect("/");
});





router.get('/', function(req, res, next) {
  // User is Not Logged in.
  if(!req.session.user) res.render('index');
  else UserController.index(req,res);
});

module.exports = router;
