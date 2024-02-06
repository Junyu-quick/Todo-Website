//as of now, have 2 main property: name and password(bycrpted)
//have a method generateAuthToken

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser (body) {
    schema = {
        username: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(1).max(100)
    }

    return Joi.validate(body, schema);
};
    
exports.User = User;
exports.validate = validateUser;