var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = require('./modules/router');
var API = require('./modules/api');
var contentGen = require('./modules/pages');

API.symbolDB.start();
router.start(app, __dirname);

/**static path for resources**/
app.use('/res', express.static(__dirname + "/HTML/resources"));

/**socket handlers**/
io.on('connection', function(socket){

    /**fetch event**/
    socket.on('fetch', function(data){
        contentGen.getDefaultContent(function(content){
            var payload = {
                content: content,
                ids: data
            }
            socket.emit('load', payload);
        });
    });

    /**company fetch event**/
    socket.on('cfetch', function(data){
        var payload;
        API.getDetailInfo(data, function(body){
           payload = body;
           API.getLogo(data, function(body){
               payload.logo = body.url;
               socket.emit('cload', payload);
           })
        });
    });

    /**Event to get chart data**/
    socket.on('chart', function(data){
        var payload = [];
        var ctr = 1;
        data.forEach(function(item, index, array){
            var com = {};
            com.ID = item.ID;
            com.field = item.field;
            API.getChartData(data.ID, function(body){
                com.prices = [];
                com.labels = [];
                body.forEach(function(item){
                    com.labels.push(item.label);
                    com.prices.push(item.close);
                });
                payload.push(com);
                ctr++;
                if(ctr === array.length){
                    socket.emit('lchart', payload);
                }
            });

        });
    });

    /**search event**/
    socket.on('search', function(data){
        API.symbolDB.search(data.type, data.text, function(results){
            socket.emit('result', results);
        });
    })
});

/**HTTP Listener**/
http.listen(20345, function(){
    console.log("listening on :20345");
});
