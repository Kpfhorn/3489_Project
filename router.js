//Handles routing of URLs

var express = require('express');
var bodyParser = require('body-parser');
var User = require('./user');

module.exports = {

    start: function(app, io){
        rt(app, io);
    }

};

rt = function (app) {
    //Router Functions

    //app.use(express.bodyParser());

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post('/login', function(req, res){
        var email = req.body.email;
        var password = req.body.password;
        User.getUser(email, function(user){
            if(user.phash === password){
                console.log('login successful');
            }
        })
    });

    app.post('/register', function(req, res){

    });

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/HTML/index.html');
    });

    app.get('/home', function (req, res) {
        res.sendFile(__dirname + '/HTML/home.html');
    });

    app.get('/profile', function (req, res) {
        res.sendFile(__dirname + '/HTML/profile.html');
    });

    app.get('/search', function (req, res) {
        res.sendFile(__dirname + '/HTML/search.html');
    });

    app.get('/selector', function (req, res) {
        res.sendFile(__dirname + '/HTML/stock-selector.html');
    });

    app.get('/company/*', function(req, res){
        res.sendFile(__dirname + '/HTML/com-profile.html');
    });

    app.get('/styles.css', function (req, res) {
        res.sendFile(__dirname + '/HTML/styles.css');
    });

    app.get('/assets/sample.png', function (req, res) {
        res.sendFile(__dirname + '/assets/sample.png');
    });

};
