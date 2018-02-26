var exec = require('child_process');

module.exports = {
    generate: function(url){
        generate(url);
    }

}

var generate = function(url){
    exec.exec('java -jar infoPageGenerator.jar ' + url);
}