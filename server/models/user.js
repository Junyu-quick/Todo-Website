//as of now, have 2 main property: name and password(bycrpted)
//have a method generateAuthToken

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');

const quoteSchema= new mongoose.Schema({
    quote: {
        type: String,
        required: true,
        default: 'Set Your Quote',
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        default: `Visit Setting's Page To Set It Up.`,
        maxlength: 100
    },
    checked: {
        type: Boolean,
        required: true,
        default: true
    }
})

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
    quotes: [quoteSchema],
    isAdmin: Boolean
    
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(body) {
    schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(1).max(100)
    });

    return schema.validate(body);
};
    
exports.User = User;
exports.validate = validateUser;