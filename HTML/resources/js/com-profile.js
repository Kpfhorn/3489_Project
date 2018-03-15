$(function(){
    var socket = io();
    var url = window.location.href;
    var temp = url.split('/');
    var id = temp.pop();
    console.log(id);
    socket.emit('cfetch', id);
    socket.on('cload', function(data){
        console.log(data);
        $('#logo').attr('src', data.logo);
        $('#name').text(data.companyName);
        $('#description').text(data.description);

    });
});
