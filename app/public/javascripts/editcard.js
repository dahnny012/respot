var currentFlashCard;

function editCardData(index)
{
    var card = deck.cards[index];
    currentFlashCard = card._id;
    
    $('#edit-card-front').text(card.front);
    $('#edit-card-back').text(card.back);
}

$(document).ready(function(){
    //bind event to the form modal
    $('#edit-card').submit(function (evt) {
    evt.preventDefault();
    var data = formData('#edit-card');
    
    //TODO: make a POST WITH THE GIVEN FLASHCARD INDEX AND ALSO THE DECK ID 
    $.post("edit/"+ deck._id+"/"+ currentFlashCard,data,function(msg){
        window.reload();
    });
    })
});