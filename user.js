

const USERS = [];

class User {
    constructor(name, email, phash){
        this.name = name;
        this.email = email;
        this.phash = phash;
    }
}

const def = new User('John Smith', 'john@example.com', 'password');
USERS.push(def);

module.exports = {

    addUser: function(name, email, phash){
        let usr = new User(name, email, phash);
        USERS.push(usr);
    },

    getUser: function(email, callback){
        USERS.forEach(function(item){
            if(item.email === email){
                callback(item);
            }
        })
    }
};