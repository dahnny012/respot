var curIndex; //holds the current card index
var displayFront;
var moveNext;

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
                     $("body").css("background-color",getNextColor());
                     $(document).unbind('click');
                 });
                 loadNextData();
                 $('#evaluate').fadeIn();
            });

}

function sendResult(isTrue)
{
    if(isTrue)
        console.log("User thinks they are right.") //perform call to backend to record true 
    else
        console.log("User thinks they are wrong.") //perform call to backend to record false

    $('.flashcard').toggleClass('flipped').promise().done(function() {
        var target = srs[curIndex];
        target.answer = isTrue;
        $.post("",target,function(msg){
            console.log(msg);
        })
        $("#evaluate").hide();
    flipLogic();
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
    if(curIndex != flashcards.length - 1)
    {
        if(moveNext) //move to next card if the back is being displayed
        {
            curIndex++;
            moveNext = false;
        }
    }
    else
    {
        window.location = '/'
    }
    loadCardData(curIndex);
    console.log("loaded:" + curIndex);
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


var colors = ["#f44336","#2196f3","#ff9800","#4caf50","#9c27b0"];
function getNextColor(){
        var next = colors.shift();
        colors.push(next);
        return next;
}

$(document).ready(function() {
    init();
    $("body").css("background-color",getNextColor());

});