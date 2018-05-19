let requests = requirejs(['/res/js/util/requests.js']);
$.get('/userDetailInfo', function(data){
    if(data){
        let user = data;
        $('#Name').append(user.first_name + " " + user.last_name);
        $('#Email').append(user.email);
    }
});


