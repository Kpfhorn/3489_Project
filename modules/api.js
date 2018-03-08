//Handles access to stock data

var request = require('request');
var symbols = '';
var isStarted = false;

module.exports = {

    /**
     * Handles access to symbol list
     */
    symbolDB: {
        start: function(){
            fetchSymbolData();
            isStarted = true;
        },

        /**
         * Search for a symbol or company
         * @param type type of search (symbol or company name)
         * @param string search string
         * @param callback
         */
        search: function(type, string, callback){
            if(isStarted){
                search(type, string, callback);
            }
        }
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
     * get data to generate a chart
     * @param ID
     * @param callback
     */
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

};

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

var fetchSymbolData = function(){
    initSymbolList(function(list){
        symbols = list;
    });
};

initSymbolList = function(callback){
    getGeneric('/ref-data/symbols', callback);
};

var search = function(type, string, callback){
    var results = [];
    symbols.forEach(function(item, index){
        if(type === 'name'){
            if(item.name.toLowerCase().includes(string.toLowerCase())){
                results.push(item);
            }
        }else if(type === 'symbol'){
            if(item.symbol.toLowerCase().includes(string.toLowerCase())){
                results.push(item);
            }
        }

    });
    callback(results);
};

