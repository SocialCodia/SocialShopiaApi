const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Constants = require('../utils/constants');
const { func } = require('@hapi/joi');
const Schema = mongoose.Schema;


const userSchema = new Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
    },
    type: {
        type: String,
        enum: ['user', 'admin', 'delivery-boy'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['unverified', 'verified', 'banned'],
        default: 'unverified'
    }
}, {
    timestamps: true
});


userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();

    bcrypt.genSalt(Constants.BCRYPT_PASSWORD_SALT_FACTOR, (err, salt) => {

        if (err)
            return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            return next();
        })

    })

});

userSchema.pre('updateOne', function (next) {

    const user = this.getUpdate();
    if (user.password != null) {
        bcrypt.genSalt(Constants.BCRYPT_PASSWORD_SALT_FACTOR, (err, salt) => {
            if (err)
                return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err)
                    return next(err);
                user.password = hash;
                return next();
            })
        })
    }
    else {
        return next();
    }
});


module.exports = new mongoose.model('User', userSchema, 'users');