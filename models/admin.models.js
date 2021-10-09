const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Token = require('../models/admintoken.model');
const key = require('../config/key');

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Your email is required',
        trim: true
    },

    password: {
        type: String,
        required: 'Your password is required',
        max: 100
    },
    resetPasswordToken: {
        type: String,
        required: false
    },

    resetPasswordExpires: {
        type: Date,
        required: false
    }
}, {timestamps: true});


adminSchema.pre('save',  function(next) {
    const admin = this;

    if (!admin.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(admin.password, salt, function(err, hash) {
            if (err) return next(err);

            admin.password = hash;
            next();
        });
    });
});

adminSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

adminSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
    };

    return jwt.sign(payload, key.secret, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

adminSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

adminSchema.methods.generateVerificationToken = function() {
    let payload = {
        adminId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};

const Modelclass = mongoose.model("Admins", adminSchema);

//Export the model
module.exports = Modelclass;