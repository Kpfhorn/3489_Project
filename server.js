var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = require('./router');
var API = require('./api');



router.route(app, io);

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
});




//HTTP Listener
http.listen(20345, function(){
    console.log("listening on :20345");
});


