//JS to automagically generate cards, will POST to server that will make the relevant calls

var data = [{
                'displayName': 'GRE Vocabulary', 
                'val': 'gre', 
                'desc' : "A PEARSON Deck of Baron's GRE Words." 
               }, 
               {  
                 'displayName' : 'English Words',
                 'val' : 'english-words',
                 'desc' : 'A PEARSON Deck of English Words.'
           }];

function loadData(selector)
{
    var menu = $(selector);
    $.each(data, function(idx, obj) {   
     menu
         .append($("<option></option>")
         .attr("value",obj.val)
         .text(obj.displayName));
    });
    
    $('#subtype-desc').val(data[0].desc); //for the first description
    
    
    // for(entry in data)
    // {
    //     $('#subtype-choice').val()
    // }
}

function updateDesc()
{
    var selection = $('#subtype-choice').find(":selected").val();
    $.each(data, function(idx, obj) {   
        if(obj.val == selection)
            $('#subtype-desc').val(obj.desc);
    });
}


$(document).ready(function(){
    
    loadData('#subtype-choice');
    
    $('#gen-deck').submit(function (evt) {
    evt.preventDefault();
    var data = formData('#gen-deck');
    
    document.getElementById("gen-deck-button").value = "Please Wait ...";
    $("#gen-deck-button").attr('disabled','disabled');
    
    $.post("deck/pearson/",data, function(msg) {
            // window.location('/');
    });

    });
});