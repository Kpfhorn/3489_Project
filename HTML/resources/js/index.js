
var login = function(){
    var email = $('#email').val();
    var password = $('#password').val();
    var inf = {
        email: email,
        password: password
    }
    var payload = {
        data: JSON.stringify(inf),
        contentType: 'application/json',
        type: 'POST',
        url: '/login',
        success: function(dt){
            console.log(dt);
        }
    };
    $.ajax(payload);
};