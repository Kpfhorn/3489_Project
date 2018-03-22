$(function () {
    var socket = io();
    var count = 1;
    var template = '';
    $.get('/res/home_table_template.html', function(data, status){
        template = data.toString();
    });

    const loadChart = function(payload){
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
                        fill: false,
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
        };


    const load = function(data){
        console.log(data);
        var tmp = template;
        var field = 'info' + count;
        var canvas = 'img' + count;
        var id = '#' + field;
        var send = {
            ID: data.symbol,
            field: ('#' + canvas)
        }
        tmp = tmp.replace('temp', field);
        tmp = tmp.replace('cnvs', (canvas));
        count++;
        $('#table').append(tmp);
        $(id).find('.title').text(data.companyName);
        $(id).find('.ID').text('(' + data.symbol + ')').attr('href', '/company/'+data.symbol);
        $(id).find('.price').text('$'+ data.price);
        getDataset(data.symbol, send, loadChart);
    };

    getStockData('GOOG', load);
    getStockData('AAPL', load);
    getStockData('TSLA', load);
    getStockData('MSFT', load);

});
