var express = require('express');
var router = express.Router();

var UserControllerFactory = require("./UserController");
var UserController = new UserControllerFactory();

router.get('/deck', function(req, res, next) {
    var controller = require("./DeckController")();
});


router.get('/study', function(req, res, next) {
    var controller = require("./StudyController")();
    res.render('study', { title: 'Express' });
});

router.get('/study',function(req,res,next){
    res.render('study',{title:'Express'});    
})

router.get('/user', function(req, res, next) {
    var controller = require("./UserController")();
});


router.get('/user/register', function(req, res, next) {
    res.render("register",{title:'Express'});
});

router.post('/user/register', function(req, res, next) {
    var POST = req.body;
    UserController.register(req,res);
});


router.get('/flashcard', function(req, res, next) {
    var controller = require("./FlashcardController")();
});


// This is from a tutorial
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
