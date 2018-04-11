//Handles routing of URLs

var express = require('express');
var bodyParser = require('body-parser');
var User = require('./user');
const cookieParser = require('cookie-parser');

const LOGINS = [];

module.exports = {

    start: function(app, API){
        rt(app, API);
    }

};

rt = function (app, API) {
    //Router Functions


    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post('/login', function(req, res){
        var email = req.body.email;
        var password = req.body.password;
        User.getUser(email, function(user){
            if(user.phash === password){
                console.log('login successful');
                res.cookie('email', email);
                res.send('success');

            }
        })
    });

    app.post('/register', function(req, res){

    });

    app.post('/api/priceData', function(req, res){
        var id = req.body.id;
        let dates  = [];
        API.getChartData(id, function(data){
            for(let i = 0; i < 6; i++){
                let day = data.pop();
                dates.push(day);
            }
            res.send(dates);
        });
    });

    app.post('/api/price', function(req, res){
        let id = req.body.id;
        API.getPrice(id, function(data){
            res.send(data);
        })
    });

    app.post('/api/user', function(req, res){
        let email = req.body.email;
        User.getUser(email, function(user){
            let payload = {
                name: user.name,
                email: user.email
            }
            res.send(payload);
        })
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
