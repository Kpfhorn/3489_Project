var socket = io();

var loadPage = function(page, callback){
    $.get('/res/' + page + '-template.html', function(data, status){
        console.log(status);
        $('#contents').empty();
        callback(data);
    })
};

var loadComProfile = function(ID){
    $('.header').empty();
    $('.header').append('Company Profile');
    $('a').removeClass('active');
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

var loadProfile = function(){
    $('.header').empty();
    $('.header').append('Profile');
    $('a').removeClass('active');
    $('#nav_profile').addClass('active');
    loadPage('profile', function(data){
        $('#contents').append(data);
    })
}

var loadHome = function() {
    $('.header').empty();
    $('.header').append('Home');
    $('a').removeClass('active');
    $('#nav_home').addClass('active');
    loadPage('home', function(data){
        $('#contents').append(data);

        socket.on('load', function(data){
            $('#companies').empty();
            $('#companies').append(data.content);
            var ctr = 1;
            var payload = [];
            data.ids.forEach(function(item, index, array){
                var canvas = 'img' + index;
                var send = {
                    ID: item.ID,
                    field: ('#' + canvas)
                };
                payload.push(send);
                ctr++;
                if(ctr === array.length){
                    socket.emit('chart', payload);
                }
            });
        });
    });
    socket.emit('fetch',
        [{'ID':'GOOG'},
            {'ID':'AAPL'},
            {'ID':'TSLA'},
            {'ID':'MSFT'}]
    );

};


var loadSearch = function(){
    $('.header').empty();
    $('.header').append('Search');
    $('a').removeClass('active');
    $('#nav_search').addClass('active');
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

socket.on('lchart', function(payload){
    console.log(payload[0].field);
    var ctx = $(payload[0].field);
    var dataset = {
        label: '',
        borderColor: '#FFFFFF',
        fill: false,
        data: ''
    };
    var myChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: payload[0].labels,
            datasets: []
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
                labels: {
                    fontColor: '#FFFFFF'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: '#FFFFFF'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: '#FFFFFF'
                    }
                }]
            }

        }
    });
    payload.forEach(function(item, index, array){
        var data = dataset;
        data.label = item.label;
        data.data = item.prices;
    });
})