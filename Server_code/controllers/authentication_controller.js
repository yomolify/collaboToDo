const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
    var timestamp = new Date().getTime();
    return jwt.encode({
        sub : user.id,
        iat : timestamp
    }, config.secret);
}

exports.signin= function(req,res,next) {
    var user=req.user;
    res.send({token: tokenForUser(user), user_id : user._id});
    console.log(user.todos);
}

exports.signup = function(req,res,next) {
    var email = req.body.email;
    var password = req.body.password;

    if(!email || !password){
        console.log(req.body.email,req.body.password);
        return res.status(422).json({error : "You must provide Email and Password !" });
    }

    User.findOne({email : email},function(err,existingUser){
        if(err){
            return next(err);
        }
        if(existingUser){
            return res.status(422).json({error : "Email Taken !"});
        }
        var user = new User({
            email : email,
            password : password
        })
        user.save(function(err){
            if(err){
                return next(err);
            }
            res.json({user_id: user.id,  token: tokenForUser(user)});
        });
    });
}