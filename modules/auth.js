//Handles routing of URLs

const mongoose = require('mongoose');
const uri = "mongodb+srv://user_manager:phdDVDpHWh4PAqYG@cosc3489-dv6mn.mongodb.net/users";
const session = require('express-session');
const dbUser = require('./UserSchema');
mongoose.connect(uri);
const db = mongoose.Connection;


module.exports = {

    start: function(app, API){
        rt(app, API);
    },

    checkLogin: function(req, res, next){
        return checkLogin(req, res, next);
    }

};

const checkLogin = function(req, res, next){
    dbUser.findOne({_id: req.session.userId})
        .exec(function(err, user){
            if(err){
                return next(err);
            }else if(!user){
                return next();
            } else{
                    res.locals.user = user;
                    return next();
                }
            }
    );
};



const doLogin = function(req, res, next){
    let email = req.body.email;
    let password = req.body.password;
    dbUser.findOne({email: email})
        .exec(function(err, user){
            if(err){
                return res.send({
                    error: err
                });
            }else if(!user){
                let error = new Error('User not found!');
                error.status = 401;
                return res.send({
                    error: error
                });
            }else{
                if(user.password === password){
                    req.session.userId = user._id;
                    return res.send('/home');
                }else{
                    let error = new Error('Incorrect Password');
                    error.status = 401;
                    return res.send({
                        error: error
                    });
                }

            }
        });
};

const rt = function (app, API) {

    app.use(session({
        secret: 'git gud',
        resave: true,
        saveUninitialized: false
    }));

    app.post('/login', doLogin, function(req, res, next){
        return next();
    });

    app.post('/register', function(req, res, next){
        const userData = {
            email: req.body.email,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password
        };
        dbUser.create(userData, function(err, user){
            if(err){
                return next({
                    error: err
                });
            }else{
                return next();
            }
        })


    }, doLogin);

    app.get('/logout', checkLogin, function(req, res){
        if(res.locals.user){
            req.session.userId = null;
            res.redirect('/');
        }else{
            res.redirect('/home');
        }
    });

    app.get('/userInfo', checkLogin, function(req, res){
        if(res.locals.user){
            let usr = {};
            usr.name = res.locals.user.first_name + " " + res.locals.user.last_name;
            usr.email = res.locals.user.email;
            res.send(usr);
        }else{
            res.send(new Error("Client not logged in"));
        }
    });

    app.get('/userDetailInfo', checkLogin, function(req, res){
        if(res.locals.user){
            res.send(res.locals.user);
        }else{
            res.send(new Error("Client not logged in"));
        }
    })

};



