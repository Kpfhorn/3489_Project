var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = require('./router');

router.route(app);


//HTTP Listener
http.listen(20345, function(){
    console.log("listening on :20345");
});
