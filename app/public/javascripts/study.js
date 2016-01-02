var userDetermined; //holds the user choice if user thinks is true or false

function init()
{
    // $.mobile.loading().remove();
    $(".navbar-fixed-bottom").hide(); //hide buttons first
    
    userActionHandler('.determineFalse', false);
    userActionHandler('.determineTrue', true);
    
    flipLogic();
}

function flipLogic()
{
    $('.flashcard').on({
        'click swipe' : function()
            {
                 $('.flashcard').toggleClass('flipped').promise().done(function(){
                     $('.flashcard').unbind('click swipe');
                 });
                 $('.navbar-fixed-bottom').fadeIn();
            }
    });
}

function sendResult(isTrue)
{
    if(isTrue)
        console.log("User thinks they are right.") //perform call to backend to record true 
    else
        console.log("User thinks they are wrong.") //perform call to backend to record false
    
    /*update UI and clean up for next card by:
     - update the front of the card, 
     - flip it, then update teh other side of the card
     - hide dem buttonz again
     - rinse and repeat.
    */
    $('.flashcard').toggleClass('flipped').promise().done(function() {
        $(".navbar-fixed-bottom").hide();
    
    flipLogic();
    });
}


//generic function that handles user action, to be mapped to a class
function userActionHandler(ele, isTrue)
{
    if(isTrue) //map action for true
    {
        $(ele).on('click', function() {
            sendResult(true);
        });
    }
    else
    {
        $(ele).on('click', function() {
            sendResult(false);
        });
    }
}

$(document).ready(function() {
    init();
});