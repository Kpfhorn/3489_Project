define({
    post: function(url, data, callback){
        var payload = {
            data: JSON.stringify(data),
            contentType: 'application/json',
            type: 'POST',
            url: url,
            success: callback
        };
        $.ajax(payload);
    }
})