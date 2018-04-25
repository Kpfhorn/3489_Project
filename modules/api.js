//Handles access to stock data

const request = require('request');
const fetch = require('node-fetch');

const sdb = {
    symbols: '',
    isStarted: false,
    search: function(type, string, callback){
        let results = [];
        sdb.symbols.forEach(function(item){
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
    }
};



module.exports = {

    symbolDB: {
        isStarted: false,
        symbols: '',
        start: function(){
            getSymbolList(function(list){
                sdb.symbols = list;
                sdb.isStarted = true;
            })
        },
        search: function(type, key, callback){
            if(sdb.isStarted){
                sdb.search(type, key, callback);
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
    
    getChartData: function(ID, callback){
        getGenericData(ID, 'chart', callback);
    },

    getChartDataAsync: function(ID){
        return getGenericDataAsync(ID, 'chart');
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

const base = 'https://api.iextrading.com/1.0'

const getSymbolList =  function(callback){
    getGeneric('/ref-data/symbols', callback);
};

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

const getGenericDataAsync = async function(company, endpoint){
    const uri = base + '/stock/' + company +'/' + endpoint;

    let result = await fetch(uri);
    let body = await result.json();
    return body;
};

const getGeneric = function(endpoint, callback){
    const uri = base + endpoint;
    request(uri, {json: true}, function(err, res, body){
        callback(body);
    });
};

