var loadHome = function() {
    $('#contents').empty();
    $.get('/res/home-template.html', function(data, status){
        $('#contents').append(data);
        var count = 1;
        var template = '';
        $.get('/res/home_table_template.html', function(data, status){
            template = data.toString();
        });

        socket.emit('fetch', {'ID':'GOOG'});
        socket.emit('fetch', {'ID':'AAPL'});
        socket.emit('fetch', {'ID':'TSLA'});
        socket.emit('fetch', {'ID':'MSFT'});
    })

};
