var currentDeckID;
function formData(id){
    var data = {}
    $(id).serializeArray().forEach(function(e){
        data[e.name] = e.value;
    })
    
    return data;
}

$(document).ready(function(){
    $('#new-card').submit(function (evt) {
    evt.preventDefault();
    var data = formData('#new-card');
    $.post("deck/add/"+currentDeckID,data,function(msg){
        $(".counter-"+currentDeckID).each(function(index, element){
            element.innerText = parseInt(element.innerText) + 1;
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