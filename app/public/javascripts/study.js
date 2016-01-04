var curIndex; //holds the current card index

function init()
{
    $("#evaluate").hide(); //hide buttons first
    
    //userActionHandler('.determineFalse', false);
    //serActionHandler('.determineTrue', true);
    
    curIndex = 0;
    //loadCardData(curIndex);
    flipLogic();
}

function flipLogic()
{
    $('.flashcard').on({
        'click' : function()
            {
                 $('.flashcard').toggleClass('flipped').promise().done(function(){
                     $('.flashcard').unbind('click');
                 });
                 $('#evaluate').fadeIn();
            }
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

function loadNextCard()
{
 /*update UI and clean up for next card by:
     - update the front of the card, 
     - flip it, then update teh other side of the card
     - hide dem buttonz again
     - rinse and repeat.
    */
    if(curIndex != flashcards.length - 1)
        curIndex++;
    else
    {
        window.location = '/'
    }
    loadCardData(curIndex);
    console.log("Next card loaded:" + curIndex);
}

//update the html for front and back.
function loadCardData(index)
{
    $('.txt-front').text(flashcards[index].front);
    
    $('.title').text(flashcards[index].front); //update the title at the back 
    $('.txt-back').text(flashcards[index].back);
}


//generic function that handles user action, to be mapped to a class
function userActionHandler(ele, isTrue)
{
    if(isTrue) //map action for true
    {
        $(ele).on('click', function() {
            sendResult(true);
            loadNextCard();
        });
    }
    else
    {
        $(ele).on('click', function() {
            sendResult(false);
            loadNextCard();
        });
    }
}


var colors = ["#f44336","#2196f3","#ff9800","#4caf50","#9c27b0"];
function getNextColor(){
    var next = colors.shift()
    colors.push(next);
    return next;
}

$(document).ready(function() {
    init();
    $("body").css("background-color",getNextColor());
});