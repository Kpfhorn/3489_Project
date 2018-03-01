$(function () {
    var socket = io();
    var count = 1;
    var template = '';
    $.get('/res/home_table_template.html', function(data, status){
        template = data.toString();
    });

    socket.emit('fetch', {'ID':'GOOG'});
    socket.emit('fetch', {'ID':'AAPL'});
    socket.emit('fetch', {'ID':'TSLA'});
    socket.emit('fetch', {'ID':'MSFT'});
    socket.on('load', function(data){
        var tmp = template;
        var field = 'info' + count;
        var id = '#' + field;
        tmp = tmp.replace('temp', field);
        count++;
        $('#table').append(tmp);
        $(id).find('.title').text(data.name);
        $(id).find('.ID').text('(' + data.ID + ')').attr('href', '/company/'+data.ID);
        $(id).find('.price').text('$'+ data.price);
    });
})