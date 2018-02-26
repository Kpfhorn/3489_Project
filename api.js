var request = require('request');

module.exports = {

    getPrice: function(ID, callback){
        getPriceData(ID, callback);
    },

    getInfo: function(ID, callback){
        getStockData(ID, callback);
    },

    getDetailInfo: function(ID, callback){
        getGenericData(ID, 'company', callback);
    },

    getLogo: function(ID, callback){
        getGenericData(ID, 'logo', callback);
    }


}

var base = 'https://api.iextrading.com/1.0';

var getStockData = function(company, callback){
    var info = {
        ID: "",
        name: "",
        price: 0
    };

    getPriceData(company, function(data){
        info.ID = data.ID;
        info.price = data.price;
        getGenericData(company, 'company', function(dt){
            info.name = dt.companyName;
            callback(info);
        });
    });
};

var getPriceData = function(company, callback){
    var uri = base + '/stock/' + company + '/price';
    var data = {
        ID: company,
        price: 0
    };
    request(uri, {json: true}, function(err, res, body){
        data.price = body;
        callback(data);
    });

}

var getGenericData = function(company, endpoint, callback){
    var uri = base + '/stock/' + company +'/' + endpoint;
    request(uri, {json: true}, function(err, res, body){
            callback(body);
    });
}