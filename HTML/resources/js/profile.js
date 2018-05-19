let charts = '';
let requests = '';
let chart = null;
requirejs(['res/js/util/charts.js'], function(c){
    charts = c;
    requests = c.requests;
    loadPage();
});

const loadInfo = function(){
    $.get('/userInfo', function(dt){
        $('#name').text(dt.name);
        $('#email').text(dt.email);
    });
};

const loadPage = function (){
    loadInfo();
    $.get('/api/user/stock_list', function(data){
        charts.loadCustomChart(data, '#profileChart');
    })
}

var openSelector = function(){
  window.location.href = "/selector";
};
