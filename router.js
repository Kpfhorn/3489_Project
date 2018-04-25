//Handles routing of URLs

var bodyParser = require('body-parser');
var User = require('./user');
const Auth = require('./auth');
const DEF_LIST = [
    'GOOG',
    'AAPl',
    'MSFT',
    'TSLA'
];

module.exports = {

    start: function(app, API){
        rt(app, API);
    }

};

rt = function (app, API) {
    //Router Functions


    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    Auth.start(app, API);

    app.post('/api/info', function(req, res){
       let ID = req.body.id;
       API.getInfo(ID, function(data){
           data.field = req.body.field;
           res.send(data);
       })
    });

    app.post('/api/cinfo', function(req, res){
        let id = req.body.id;
       API.getDetailInfo(id, function(body){
           let payload = body;
           API.getLogo(id, function(bd){
               payload.logo = bd.url;
               res.send(payload);
           })
       })
    });

    app.post('/api/chart', function(req, res){
       let payload = {};
       payload.ID = req.body.id;
       payload.field = req.body.field;
       API.getChartData(req.body.id, function(body){
           payload.prices = [];
           payload.labels = [];
           body.forEach(function(item, index){
               payload.labels.push(item.label);
               payload.prices.push(item.close);
           });
           res.send(payload);
       })
    });

    app.post('/api/charts', function(req, res){
        let payload = {};
        let IDs = req.body.IDs;
        payload.data = [];
        payload.field = req.body.field;
        let count = 0;
        IDs.forEach(async function(item, index){
            let body = await API.getChartDataAsync(item);
            let set = {};
            set.ID = item;
            set.prices = [];
            set.labels = [];
            body.forEach(function(itm, idx){
                set.labels.push(itm.label);
                set.prices.push(itm.close);
            });
            payload.data.push(set);
            if(index === IDs.length - 1){
                res.send(payload);
            }
        });

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

    app.get('/api/user/stock_list', Auth.checkLogin, function(req, res){
       if(res.locals.user){
           res.send(res.locals.user.stock_list);
       }else{
           res.send(DEF_LIST);
       }
    });

    app.post('/api/search', function(req, res){
        let data = req.body;
        API.symbolDB.search(data.type, data.text, function(results){
            res.send(results);
        });
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
    app.get('/EditProfile', function (req, res) {
        res.sendFile(__dirname + '/HTML/EditProfile.html');
    });

    app.get('/register', function(req, res){
        res.sendFile(__dirname + '/HTML/register.html');
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


