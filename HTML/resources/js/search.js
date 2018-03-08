
var loadSearch = function(socket){

    var result_template = '';
    $.get('/res/search_result_template.html', function(data, status){
        result_template = data.toString();
    });



};
var search = function(){
    var txt = $('#searchText').val();
    var tp = $('#option').val();
    var data = {
        type: tp,
        text: txt
    };
    socket.emit('search', data);
    $('#searchText').val('');


};
