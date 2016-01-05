var currentDeckID;
function formData(id){
    var data = {}
    $(id).serializeArray().forEach(function(e){
        data[e.name] = e.value;
    })
    
    return data;
}

$(document).ready(function(){
    
    //turn off study buttons that do not have enough cards in the deck
    $('.study-counter, .card-num-counter').each(function(index, counter){
        if(parseInt(counter.innerText) == 0)
        {
            $(counter).parent().prop('disabled', true);
        }
    })
    
    //bind event to the form modal
    $('#new-card').submit(function (evt) {
    evt.preventDefault();
    var data = formData('#new-card');
    
    $.post("deck/add/"+currentDeckID,data,function(msg){
        $(".counter-"+currentDeckID).each(function(index, element){
            element.innerText = parseInt(element.innerText) + 1;
            if(parseInt(element.innerText) >= 1)
                $('#study-'+currentDeckID).prop('disabled', false);
                $('#deck-'+currentDeckID).prop('disabled', false);
        });
        // Reflect the change in the UI.
            // Increment the counters in the deck.
            // Increment the counters in  the SRS.
    });
        document.getElementById("create-card-button").value = "Add Another Card";
        document.getElementById("new-card").reset();
    });
})

function setValID(id){
    currentDeckID = id;
}


//FOR PEARSON ADD CARDS

$(document).ready(function()
{
   loadData('#subtype-choice');
   console.log("PEARSON ADD FUNCTION LOADED.");
});