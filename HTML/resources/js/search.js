let result_template = '';
let requests = '';
requirejs(['/res/js/util/requests.js'], function(util){
    $.get('/res/search_result_template.html', function(data, status){
        result_template = data.toString();
        requests = util;
        search();
    });

});

const search = function(){
    const txt = $('#searchText').val();
    const tp = $('#option').val();
    const data = {
        type: tp,
        text: txt
    };
    requests.post('/api/search', data, function(results){
        let count = 1;
        $('#results').empty();
        results.forEach(function(item){
            let field = 'result' + count;
            let id = '#' + field;
            count++;
            let res = result_template.replace('temp', field);
            $('#results').append(res);
            $(id).find('.name').text(item.name);
            $(id).find('.symbol').text(item.symbol).attr('href', '/company/'+item.symbol);
        });
    });
    $('#searchText').val('');
};

