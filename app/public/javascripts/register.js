$(document).ready(function(){
    $("#register-err-msg").hide();
    $('#register').submit(function (evt) {
    var data = formData('#register');
    if(data.retype == data.pass)
    {
        evt.preventDefault();   
        $.post("user/register/",data,function(msg){
            if(msg.success){
                window.location = '/';
            }
            else{
                document.getElementById('register-err-msg').innerText = msg.error;
                $("#register-err-msg").show();
                return false;
            }
        });
    }else {
        document.getElementById('register-err-msg').innerText = "Passwords don't match. \nPlease, try again.";
        $("#register-err-msg").show();
        return false;
    }

    });
})