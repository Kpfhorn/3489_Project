const loadInfo = function(){
    let cookies = document.cookie;
    let cookie = cookies.split('=');
    let email = cookie[1].replace('%40', '@');
    let inf = {
        email: email
    };
    let payload = {
        data: JSON.stringify(inf),
        contentType: 'application/json',
        type: 'POST',
        url: '/api/user',
        success: function(dt){
            $('#name').text(dt.name);
            $('#email').text(dt.email);
        }
    };
    $.ajax(payload);
}

$(function (){
    const socket = io();
    var send = {
        ID: 'AAPL',
        field: '#profileChart'
    };
    loadInfo();
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
                    lineTension: 0,
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
