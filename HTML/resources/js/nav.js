var loadPage = function(page, callback){
    $.get('/res/' + page + '-template.html', function(data, status){
        console.log(status);
        $('#contents').empty();
        callback(data);
    })
}

var loadComProfile = function(ID){
    loadPage('com', function(data){
        $('#contents').append(data);
        var id = ID;
        console.log(id);
        socket.emit('cfetch', id);
        socket.on('cload', function(data){
            console.log(data);
            $('#logo').attr('src', data.logo);
            $('#name').text(data.companyName);
            $('#description').text(data.description);
        });
    })
};

var loadHome = function() {
    loadPage('home', function(data){
        $('#contents').append(data);

        socket.on('load', function(data){
            console.log('dbg')

            $.get('/res/home_table_template.html', function(dat, status){
                var template = dat.toString();
                console.log(data);
                data.forEach(function(item, index){
                    var tmp = template;
                    var field = 'info' + index;
                    var canvas = 'img' + index;
                    var id = '#' + field;
                    var send = {
                        ID: item.ID,
                        field: ('#' + canvas)
                    };
                    if(!$(id).length) {
                        tmp = tmp.replace('temp', field);
                        tmp = tmp.replace('cnvs', (canvas));
                        $('#table').append(tmp);
                        $(id).find('.title').text(item.name);
                        $(id).find('.ID').text('(' + item.ID + ')');
                        $(id).find('.ID').click(function () {
                            loadComProfile(item.ID);
                        })
                        $(id).find('.price').text('$' + item.price);
                        socket.emit('chart', send);
                    }
                })
            });

        });


    })
    socket.emit('fetch',
        [{'ID':'GOOG'},
            {'ID':'AAPL'},
            {'ID':'TSLA'},
            {'ID':'MSFT'}]
    );

};


var loadSearch = function(){
    loadPage('search', function(data) {
        $('#contents').append(data);
        var result_template = '';
        $.get('/res/search_result_template.html', function (data, status) {
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
                $(id).find('.symbol').text(item.symbol);
                $(id).find('.symbol').click(function(){
                    loadComProfile(item.symbol);
                });
            });
        });
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