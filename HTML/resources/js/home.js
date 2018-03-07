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
        var canvas = 'img' + count;
        var id = '#' + field;
        var send = {
            ID: data.ID,
            field: ('#' + canvas)
        }
        tmp = tmp.replace('temp', field);
        tmp = tmp.replace('cnvs', (canvas));
        count++;
        $('#table').append(tmp);
        $(id).find('.title').text(data.name);
        $(id).find('.ID').text('(' + data.ID + ')').attr('href', '/company/'+data.ID);
        $(id).find('.price').text('$'+ data.price);
        socket.emit('chart', send);

    });
    socket.on('lchart', function(payload){
        console.log(payload.field);
        var ctx = $(payload.field);
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: payload.labels,
                datasets: [{
                    label: payload.ID,
                    borderColor: '#FFFFFF',
                    data: payload.prices,
                }]
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
    })
});
