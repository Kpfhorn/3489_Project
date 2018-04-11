
const register = function(){

    if($('#password').val() === $('#confirm_password').val()) {

        let user = {
            firstName: $('#name_first').val(),
            lastName: $('#name_last').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };

        var payload = {
            data: JSON.stringify(user),
            contentType: 'application/json',
            type: 'POST',
            url: '/register',
            success: function(dt){
                if(dt.toString() === 'success'){
                    window.location.href = '/';
                }else{
                    alert('Registration failed: ' + dt.toString());
                }
            }
        };
        $.ajax(payload);
    }
}