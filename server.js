var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Router Functions
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/HTML/index.html');
})

app.get('/styles.css', function (req, res) {
    res.sendFile(__dirname + '/HTML/styles.css');
})

app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/HTML/home.html');
})

//HTTP Listener
http.listen(80, function(){
    console.log("listening on :80");
});
