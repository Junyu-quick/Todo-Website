const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user.js')
const auth = require('../middleware/auth.js');
const path = require('path');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
//!import user collection
const bcrypt = require('bcrypt');


//for now whether u type localhost/login,localhost/todat, all will redirect to login page 
//further changes will be done when u finish project fuctions

router.get('', (req, res) => {
    //send index.html page content, will direct to login page,

    res.header('page', 'login').sendFile(path.join(__dirname, '../../public/index.html'));

});

router.post('/jwt', auth, (req, res) => {
    const decoded = req.user;
    //todo might send decoded data in future 
    res.send();
});

router.post('/submit', async (req, res) => {
    //use joi to validate if email or pw is correct
    //return 400 if no (client side will handle rest)
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    //find if username exist in user collection
    //return 400 if no (unhappy path first, then happy path no need nest, cuz need more algorithm on happy outcome, keep it clean)
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send('Invalid Username or Password.');
    //if yes, check if pw is correct usong bcrypt.compare(returns boolean, think of variable as true, so if u put !, means false)
    //return 400 if no 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) res.status(400).send('Invalid Username or Passwword. ');
    //happy path! pw is correct
    //set header to jwt and return 200 
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send();
})



module.exports = router