$(function (){
    const socket = io();
    var send = {
        ID: 'AAPL',
        field: '#profileChart'
    };
    socket.emit('chart', send);
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
                    fill: false,
                    data: payload.prices
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

var openSelector = function(){
  window.location.href = "/selector";
};