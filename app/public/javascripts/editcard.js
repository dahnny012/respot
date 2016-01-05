var currentFlashCard;

function editCardData(index)
{
    var card = deck.cards[index];
    currentFlashCard = card._id;
    
    if(card.front != null && card.front != undefined)
        $('#edit-card-front').text(card.front);
    if(card.back != null && card.front != undefined)
        $('#edit-card-back').text(card.back);
}

function deleteCard(index)
{
    $('#card-'+index).remove();
    var card = deck.cards[index];
    $.post("/card/delete/"+card._id,{deckID:deck._id},function(msg)
    {
        // console.log(msg);   
        
    });
}

$(document).ready(function(){
    //bind event to the form modal
    $('#edit-card').submit(function (evt) {
    evt.preventDefault();
    var data = formData('#edit-card');
    
    $.post("/card/update/"+ currentFlashCard,data,function(msg){
        window.location = "";
        });
    });
});