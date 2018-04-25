const fs = require('fs');

const PATH = './HTML/USERS/users';

let USERS = '';

class User {
    constructor(name, email, phash){
        this.name = name;
        this.email = email;
        this.phash = phash;
    }
}

fs.readFile(PATH, 'utf-8', function(err, data){
   USERS = JSON.parse(data);
});



module.exports = {

    User: User,

    addUser: function(name, email, phash, callback){
        let usr = new User(name, email, phash);
        checkForUser(email, function(item){
            if (item.toString() === 'fail'){
                USERS.push(usr);
                dumpUsers();
                callback('success');
            }else callback('user exists');
        })


    },

    getUser: function(email, callback){
        USERS.forEach(function(item){
            if(item.email === email){
                callback(item);
            }
        })
    }


};
const checkForUser = function(email, callback){
    USERS.forEach(function(item){
        if(item.email === email){
            callback(item);
        }
    });
    callback('fail')
};

const dumpUsers = function(){
    fs.writeFile(PATH, JSON.stringify(USERS), 'utf-8');
}