//Handles symbol list searches and maintenance
const API = require('./api');
let symbols = '';
let isStarted = false;

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

const fetchSymbolData = function(){
    API.getSymbolList(function(list){
        symbols = list;
    });
};

const search = function(type, string, callback){
    let results = [];
    symbols.forEach(function(item){
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





