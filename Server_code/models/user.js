const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var validateEmail = function(email) {
    return (/\S+@\S+\.\S+/).test(email);
}

var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Email adress is required',
        validate: [validateEmail, 'Please Enter Valid Email']
    },
    password: {
        type: String
    },
    todos: [
        {
            text : {type : String}
        }
    ]
});

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isNew || user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next();
            });
        });
    }
    else{
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err,isMatch){
        if(err){
            return callback(err)
        }
        callback(null,isMatch);
    });
}

module.exports = mongoose.model('user', userSchema);