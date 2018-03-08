var loadComProfile = function(ID){
    var id = ID;
    console.log(id);
    socket.emit('cfetch', id);
    socket.on('cload', function(data){
        console.log(data);
        $('#logo').attr('src', data.logo);
        $('#name').text(data.companyName);
        $('#description').text(data.description);
    });
};
