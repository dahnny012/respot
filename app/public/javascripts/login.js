$(document).ready(function(){
    $("#login-err-msg").hide();
    $('#login').submit(function (evt) {
    evt.preventDefault();
    var data = formData('#login');
    $.post("user/login/",data,function(msg){
        if(msg.success){
            window.location = '/';
        }
        else{
            document.getElementById('login-err-msg').innerText = msg.error;
            $("#login-err-msg").show();
        }
    });

    });
})