<?php 


Flight::route('/game', function(){
    Flight::render('game', array());
});

Flight::route('/', function(){
    Flight::render('hello',array());
});


Flight::route('/Deck', function(){
    Flight::render('hello',array());
});


Flight::route('/Flashcard', function(){
    Flight::render('hello',array());
});


Flight::route('/Study', function(){
    Flight::render('hello',array());
});


Flight::route('/User', function(){
    Flight::render('hello',array());
});



Flight::route('/test',function(){
    Flight::render('test',array());
});


?>