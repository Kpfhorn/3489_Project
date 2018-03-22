
const base = 'https://api.iextrading.com/1.0';

const getGeneric = function(endpoint, callback){
    let url = base + endpoint;
    $.get(url, function(data){
        callback(data);
    })
};

const getGenericData = function(ID, endpoint, callback){
    const uri = '/stock/' + ID + endpoint;
    getGeneric(uri, callback);
};

const getStockData = function(ID, callback){
  getGenericData(ID, '/company', function(data){
      getGenericData(ID, '/price', function(dt){
          data.price = dt;
          callback(data);
      })
  });
};

const getChartData = function(ID, callback){
  getGenericData(ID, '/chart', callback);
};

const getLogo = function(ID, callback){
  getGenericData(ID, '/logo', callback);
};

const getDataset = function(ID, info, callback){
  let payload = {};
  payload.ID = info.ID;
  payload.field = info.field;
  getChartData(ID, function(data){
      payload.prices = [];
      payload.labels = [];
      data.forEach(function(item){
          payload.labels.push(item.label);
          payload.prices.push(item.close);
      });
      callback(payload);
  })

};