let charts = '';
let requests = '';
requirejs(['/res/js/util/charts.js'], function(util){
    console.log(util);
    charts = util;
    requests = util.requests;
    loadPage();
});

const success = function(dt){
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
};

let loadTable = function(){
    let url = window.location.href;
    let temp = url.split('/');
    let id = temp.pop();
    let inf = {
        id: id
    };
    requests.post('/api/priceData', inf, success);
};

const loadPrice = function(){
    let url = window.location.href;
    var temp = url.split('/');
    var id = temp.pop();
    var inf = {
        id: id
    }
    requests.post('/api/price', inf, function(dt) {
        console.log(dt);
        $('#price').text('$' + dt.price);
    });

};



const loadPage = function(){
    var url = window.location.href;
    var temp = url.split('/');
    var id = temp.pop();
    let inf = {
        id: id
    };
    requests.post('/api/cinfo', inf, function(data){
        $('#logo').attr('src', data.logo);
        $('#name').text(data.companyName);
        $('#description').text(data.description);
    });
    charts.loadChart(id, '#chart');
    loadTable();
    loadPrice();
};



