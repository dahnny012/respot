var express = require('express');
var router = express.Router();



router.get('/deck', function(req, res, next) {
    var controller = require("./DeckController")(router);
});


router.get('/study', function(req, res, next) {
    var controller = require("./StudyController")(router);
});

router.get('/user', function(req, res, next) {
    var controller = require("./UserController")(router);
});

router.get('/flashcard', function(req, res, next) {
    var controller = require("./FlashcardController")(router);
});


// This is from a tutorial
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// This is from a tutorial
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

module.exports = router;
