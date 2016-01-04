$(document).ready(function(){
    $("#register-err-msg").hide();
    $('#register').submit(function (evt) {
    evt.preventDefault();
    var data = formData('#register');
    $.post("user/register/",data,function(msg){
        console.log(msg);
        if(msg.success){
            window.location = '/';
        }
        else{
            document.getElementById('register-err-msg').innerText = msg.error;
            $("#register-err-msg").show();
        }
    });

    });
})