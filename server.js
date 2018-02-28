var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = require('./router');
var API = require('./api');
var symbolsDB = require('./data');



symbolsDB.start();

router.route(app, io);
app.use('/res', express.static(__dirname + "/HTML/resources"));

io.on('connection', function(socket){
    socket.on('fetch', function(data){
       API.getInfo(data.ID, function(dt){
           dt.field = data.field;
           socket.emit('load', dt);
       })
    });
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
    socket.on('search', function(data){
        console.log('search started');
        console.log(data);

        symbolsDB.search(data.type, data.text, function(results){
            socket.emit('result', results);
        });
    })
});




//HTTP Listener
http.listen(20345, function(){
    console.log("listening on :20345");
});


