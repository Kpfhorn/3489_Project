//Handles routing of URLs

var express = require('express');

module.exports = {

    route: function(app, io){
        rt(app, io);
    }

};



rt = function (app) {
    //Router Functions
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