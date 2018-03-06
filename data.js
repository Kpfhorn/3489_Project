//Handles symbol list searches and maintenance
var API = require('./api');
var symbols = '';
var isStarted = false;

module.exports = {

    start: function(){
        fetchSymbolData();
        isStarted = true;
    },

    search: function(type, string, callback){
        if(isStarted){
            search(type, string, callback);
        }
    }

};

var fetchSymbolData = function(){
    API.getSymbolList(function(list){
        symbols = list;
    });
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





