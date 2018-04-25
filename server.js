const express = require('express');
const app = express();
const http = require('http').Server(app);
const router = require('./router');
const API = require('./api');
const symbolsDB = API.symbolDB;

symbolsDB.start();
router.start(app, API);



app.use('/res', express.static(__dirname + "/HTML/resources"));

//HTTP Listener
http.listen(20345, function(){
    console.log("listening on :20345");
});
