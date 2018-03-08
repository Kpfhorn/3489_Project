var fs = require('fs');
var API = require('./api');

module.exports = {

    /**get default Home page content**/
    getDefaultContent: function (callback) {
        getHomeContent(callback);
    }
};

var getPage = function(page, callback){
    var uri = __dirname + '/../HTML/resources/' + page + '-template.html';
    fs.readFile(uri, function(err, data){
        callback(data);
    })
};

var getHomeContent = function(callback){
    var ids = [
        {'ID':'GOOG'},
        {'ID':'AAPL'},
        {'ID':'TSLA'},
        {'ID':'MSFT'}
    ];
    var uri = __dirname + '/../HTML/resources/home_table_template.html';
    var template = '';
    fs.readFile(uri, 'utf-8',function(err, data){
        template = data;
        var content = '';
        var ctr = 0;
        ids.forEach(function(item, index, array){
            var tmp = template;
            var field = 'info' + index;
            var canvas = 'img' + index;
            var id = '#' + field;

            API.getInfo(item.ID, function(dt){
                tmp = tmp.replace('temp', field);
                tmp = tmp.replace('cnvs', (canvas));
                tmp = tmp.replace('ttl', dt.name);
                tmp = tmp.replace('sym', '(' + item.ID + ')');
                tmp = tmp.replace('clk', 'loadComProfile(\'' + item.ID + '\')');
                tmp = tmp.replace('prc', dt.price);
                content += tmp;
                ctr++;
                if (ctr === array.length) {
                    callback(content);
                }
            });
        });
    });

};
