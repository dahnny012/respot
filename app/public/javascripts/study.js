var curIndex; //holds the current card index
var displayFront;
var moveNext;

//gimme a sec ok 

function init()
{
    $("#evaluate").hide(); //hide buttons first
    
    userActionHandler('#determineFalse', false);
    userActionHandler('#determineTrue', true);
    
    curIndex = 0;
    displayFront = true;
    moveNext = false;
    loadCardData(curIndex);
    flipLogic();
}

function flipLogic()
{
    $(document).click(function()
            {
                 $('.flashcard').toggleClass('flipped').promise().done(function(){
                      loadNextData();
                     $(document).unbind('click');
                 });
                 $('#evaluate').fadeIn();
            });

}

function sendResult(isTrue)
{
    $('.flashcard').toggleClass('flipped').promise().done(function() {
        var target = srs[curIndex];
        target.answer = isTrue;
        $.post("",target,function(msg){
            // console.log(msg);
        })
        $("#evaluate").hide(function(){
            flipLogic(); //have to put this in a callback else the event bubbling causes both flipLogic and loadNextData to be fired together
        });
        if(curIndex == flashcards.length - 1)
        {
            window.location = '/study/stats'
        }
    });
}

function loadNextData()
{
 /*update UI and clean up for next card by:
     - update the front of the card, 
     - flip it, then update teh other side of the card
     - hide dem buttonz again
     - rinse and repeat.
    */
    if(curIndex != flashcards.length)
    {
        if(moveNext) //move to next card if the back is being displayed
        {
            curIndex++;
            moveNext = false;
            $("body").css("background-color",getNextColor());
        }
    }
    loadCardData(curIndex);
}

//update the html for front and back.
function loadCardData(index)
{
    if(displayFront)
    {
        $('.theatre-area').text(flashcards[index].front);
        displayFront = false;
    }
    else 
    {
        $('.theatre-area').text(flashcards[index].back);
        displayFront = true;
        moveNext = true;
    }
}


//generic function that handles user action, to be mapped to a class
function userActionHandler(ele, isTrue)
{
    if(isTrue) //map action for true
    {
        $(ele).on('click', function() {
            sendResult(true);
            loadNextData();
        });
    }
    else
    {
        $(ele).on('click', function() {
            sendResult(false);
            loadNextData();
        });
    }
}

var RED = "#f44336";
var BLUE ="#2196f3";
var YELLOW = "#ff9800";
var GREEN = "#4caf50";
var PURPLE = "#9c27b0";
var ORANGE = "#ff6600";

var colors = [ORANGE,BLUE,YELLOW,GREEN,PURPLE];
function getNextColor(){
        var next = colors.shift();
        colors.push(next);
        return next;
}

$(document).ready(function() {
    init();
    $("body").css("background-color",getNextColor());

});