requests = '';
requirejs(['/res/js/util/requests.js'], function(r){
    requests = r;
});
const register = function(){

    if($('#password').val() === $('#confirm_password').val()) {

        let user = {
            firstName: $('#name_first').val(),
            lastName: $('#name_last').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };
        requests.post('/register', user, function(dt){
            console.log(dt);
            if(!dt.error){
                window.location.href = dt;
            }else{
                alert('Registration failed: ' + dt.error.toString());
            }
        });
    }
}