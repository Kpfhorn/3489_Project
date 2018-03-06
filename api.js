//Handles access to stock data

var request = require('request');


module.exports = {

    getSymbolList: function(callback){
        getGeneric('/ref-data/symbols', callback);
    },
    /**
     * Gets price data for a given stock
     * @param ID ID of a stock
     * @param callback
     */
    getPrice: function(ID, callback){
        getPriceData(ID, callback);
    },

    /**
     * gets basic info for a given stock
     * @param ID
     * @param callback
     */
    getInfo: function(ID, callback){
        getStockData(ID, callback);
    },

    /**
     * get detailed info for a given stock
     * @param ID
     * @param callback
     */
    getDetailInfo: function(ID, callback){
        getGenericData(ID, 'company', callback);
    },

    /**
     * get a logo for a given stock
     * @param ID
     * @param callback
     */
    getLogo: function(ID, callback){
        getGenericData(ID, 'logo', callback);
    },

    /**
     * access an endpoint not currently supported
     * @param ID
     * @param endpoint
     * @param callback
     */
    getGenericData: function(ID, endpoint, callback){
        getGenericData(ID, endpoint, callback);
    }

};

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
};

var getGeneric = function(endpoint, callback){
    var uri = base + endpoint;
    request(uri, {json: true}, function(err, res, body){
        callback(body);
    });
};

