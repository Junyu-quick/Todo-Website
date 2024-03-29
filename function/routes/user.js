//used to register a user only 
//--in website, to create account(directed from login page, just gen html to swap the center grey box)
//--they input their username and pw, then if valid, then direct to today page
//-- if wrong, show red text w error msg


const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validate} = require('../models/user.js');
const {Work} = require('../models/work.js');
const {NonWork} = require('../models/nonwork.js');
const auth = require('../middleware/auth.js');
const _ = require('lodash');

router.post('/create', async (req, res) => {
    //body will be username, pw
    //validate body
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({username: req.body.username});
    if (user) return res.status(400).send('User already exists.');

    //gen user doc
    user = new User(_.pick(req.body, ['username', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    //gen work and nonwork doc
    const userId = user._id;
    const userUserName = user.username;
    const work = new Work({userId : userId, username: userUserName});
    await work.save();

    const nonWork = new NonWork({userId: userId, username: userUserName})
    await nonWork.save();

    //creating and sending jwt token
    const token = user.generateAuthToken();

    //jwt will then be stored in local storage in client side 
    return res.header('x-auth-token', token).send();
})


//retrieving quotes
router.get('/quote', auth, async (req, res) => {
    const decoded = req.user;

    let user = await User.findOne({_id: decoded._id});
    if (!user) res.status(404).send('User not found.')

    const quotesArray = user.quotes;


    res.send(quotesArray);
})

//req.body [{quote: ..., description:..., checked:...}, {quote: ..., description:...}]

//setting quotes 
router.post('/quote/create', auth, async (req, res) => {
    const decoded = req.user;

    let user = await User.findOne({_id: decoded._id});
    if (!user) return res.status(404).send('User not found.');

    console.log(user)
    console.log(user.quotes)
    user.quotes = req.body;

    await user.save();
    res.send('New quote(s) added successfully.');
})


router.get('/profile', auth, async (req, res) => {
    const decoded = req.user;

    let user = await User.findOne({_id: decoded._id});
    if (!user) return res.status(404).send('User not found.');


    return res.send({userName: user.username});
})

router.post('/change', auth, async (req, res) => {
    const decoded = req.user;

    let user = await User.findOne({_id: decoded._id});
    if (!user) return res.status(404).send('User not found.');

    const salt = await bcrypt.genSalt(10);
    user.username = req.body.username;
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    
    return res.send('Password saved sucessfully.')
})


module.exports = router;