requirejs(['https://code.jquery.com/jquery-1.11.1.js']);
let charts = '';
let requests = '';
requirejs(['res/js/util/charts.js'], function(c){
    charts = c;
    requests = c.requests;
    loadPage();
});

const loadPage = function(){
    var count = 1;
    var template = '';
    $.get('/res/home_table_template.html', function(data, status){
        template = data.toString();
        $.get('/api/user/stock_list', function(data, status){
            console.log(data);
            data.forEach(function(item, index){
                requests.post('/api/info',{id: item}, function(dt){
                    var tmp = template;
                    var field = 'info' + index;
                    var canvas = 'img' + index;
                    tmp = tmp.replace('temp', field);
                    tmp = tmp.replace('cnvs', (canvas));
                    tmp = tmp.replace('ttl', dt.ID + '_ttl');
                    tmp = tmp.replace('ID', dt.ID + '_ID');
                    tmp = tmp.replace('prc', dt.ID + '_prc');
                    $('#home_table').append(tmp);
                    $('#' + dt.ID + '_ttl').text(dt.name);
                    $('#' + dt.ID + '_IDD').text('(' + dt.ID + ')').attr('href', '/company/'+data.ID);
                    $('#' + dt.ID + '_prc').text('$'+ dt.price);
                    charts.loadChart(dt.ID, ('#' + canvas));
                })
            });
        })
    });

}


