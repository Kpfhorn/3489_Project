//Handles access to stock data

const request = require('request');


module.exports = {

    getSymbolList: function(callback){
        getGeneric('/ref-data/symbols', callback);
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
    
    getChartData: function(ID, callback){
        getGenericData(ID, 'chart', callback);   
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

const base = 'https://api.iextrading.com/1.0';

const getStockData = function(company, callback){
    let info = {
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

const getPriceData = function(company, callback){
    const uri = base + '/stock/' + company + '/price';
    let data = {
        ID: company,
        price: 0
    };
    request(uri, {json: true}, function(err, res, body){
        data.price = body;
        callback(data);
    });

};

const getGenericData = function(company, endpoint, callback){
    const uri = base + '/stock/' + company +'/' + endpoint;
    request(uri, {json: true}, function(err, res, body){
            callback(body);
    });
};

const getGeneric = function(endpoint, callback){
    const uri = base + endpoint;
    request(uri, {json: true}, function(err, res, body){
        callback(body);
    });
};

