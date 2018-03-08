//Handles routing of URLs


module.exports = {

    start: function(app, path){
        rt(app, path);
    }

};



rt = function (app, path) {
    //Router Functions
    app.get('/', function (req, res) {
        res.sendFile(path + '/HTML/index.html');
    });

    app.get('/home', function (req, res) {
        res.sendFile(path + '/HTML/home.html');
    });

    app.get('/sample', function (req, res) {
        res.sendFile(path + '/HTML/chart_sample.html');
    });

    app.get('/styles.css', function (req, res) {
        res.sendFile(path + '/HTML/styles.css');
    });

};
