let loadChart = function(){
    let url = window.location.href;
    let temp = url.split('/');
    let id = temp.pop();
    let inf = {
        id: id
    };
    let payload = {
        data: JSON.stringify(inf),
        contentType: 'application/json',
        type: 'POST',
        url: '/api/priceData',
        success: function(dt){
            $.get('/res/com_profile_table_template.html', function (data) {
                let template = data.toString();
                dt.forEach(function(item){
                    let tmp = template.replace('date', item.date);
                    tmp = tmp.replace('dt', item.date + '-date');
                    tmp = tmp.replace('open', item.date + '-open');
                    tmp = tmp.replace('low', item.date + '-low');
                    tmp = tmp.replace('high', item.date + '-high');
                    tmp = tmp.replace('close', item.date + '-close');
                    $('#t01').find('tbody').append(tmp);
                    $('#' +item.date+'-date').text(item.date);
                    $('#' +item.date+'-open').text(item.open);
                    $('#' +item.date+'-low').text(item.low);
                    $('#' +item.date+'-high').text(item.high);
                    $('#' +item.date+'-close').text(item.close);
                })
            })
        }
    };
    $.ajax(payload);
};

const loadPrice = function(){
    var url = window.location.href;
    var temp = url.split('/');
    var id = temp.pop();
    var inf = {
        id: id
    }
    var payload = {
        data: JSON.stringify(inf),
        contentType: 'application/json',
        type: 'POST',
        url: '/api/price',
        success: function(dt){
            console.log(dt);
            $('#price').text('$' + dt.price);
        }
    };
    $.ajax(payload);
}

$(function(){
    var socket = io();
    var url = window.location.href;
    var temp = url.split('/');
    var id = temp.pop();
    console.log(id);
    socket.emit('cfetch', id);
    socket.on('cload', function(data){
        console.log(data);
        $('#logo').attr('src', data.logo);
        $('#name').text(data.companyName);
        $('#description').text(data.description);

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
    });

    loadChart();
    loadPrice();
    socket.emit('chart', {
        ID: id,
        field: '#' + 'chart'
    })
});




