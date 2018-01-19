var mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: { 
        type: String,
        required: true,
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
    .exec((err, user) => {
        if (err) {
            return callback(err)            
        } else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;