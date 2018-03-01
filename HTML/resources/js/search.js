var socket = io();
$(function(){

    var result_template = '';
    $.get('/res/search_result_template.html', function(data, status){
        result_template = data.toString();
    });


    socket.on('result', function(results){
        var count = 1;
        $('#results').empty();
        console.log(results);
        results.forEach(function(item, index){
            var field = 'result' + count;
            var id = '#' + field;
            count++;
            var res = result_template.replace('temp', field);
            $('#results').append(res);
            $(id).find('.name').text(item.name);
            $(id).find('.symbol').text(item.symbol).attr('href', '/company/'+item.symbol);
        });
    });
});
var search = function(){
    var txt = $('#searchText').val();
    var tp = $('#option').val();
    var data = {
        type: tp,
        text: txt
    };
    socket.emit('search', data);
    $('#searchText').val('');


}