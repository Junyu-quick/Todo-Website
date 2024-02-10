//used to register a user only 
//--in website, to create account(directed from login page, just gen html to swap the center grey box)
//--they input their username and pw, then if valid, then direct to today page
//-- if wrong, show red text w error msg

//todo create the create user route here ==> create the document for both user and work/nonwork(got default values alr ) 

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validate} = require('../models/user.js');
const _ = require('lodash');

router.post('/create', async (req, res) => {
    //body will be username, pw
    //validate body
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({username: req.body.username});
    if (user) return res.status(400).send('User already exists.');

    user = new User(_.pick(req.body, ['username', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    const token = user.generateAuthToken();

    //jwt will then be stored in local storage in client side 
    return res.header('x-auth-token', token).send();
})

module.exports = router;