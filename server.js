const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const router = require('./router');
const API = require('./api');
const symbolsDB = require('./data');

symbolsDB.start();
router.start(app, io);

app.use('/res', express.static(__dirname + "/HTML/resources"));

io.on('connection', function(socket){

    //fetch event
    socket.on('fetch', function(data){
       API.getInfo(data.ID, function(dt){
           dt.field = data.field;
           socket.emit('load', dt);
       })
    });

    //company fetch event
    socket.on('cfetch', function(data){
        let payload;
        API.getDetailInfo(data, function(body){
           payload = body;
           API.getLogo(data, function(body){
               payload.logo = body.url;
               socket.emit('cload', payload);
           })
        });
    });

    socket.on('chart', function(data){
        let payload = {};
        payload.ID = data.ID;
        payload.field = data.field;
        API.getChartData(data.ID, function(body){
           payload.prices = [];
           payload.labels = [];
           body.forEach(function(item){
               payload.labels.push(item.label);
               payload.prices.push(item.close);
           });
           socket.emit('lchart', payload);
        });
    });

    //search event
    socket.on('search', function(data){
        symbolsDB.search(data.type, data.text, function(results){
            socket.emit('result', results);
        });
    })
});

//HTTP Listener
http.listen(20345, function(){
    console.log("listening on :20345");
});
