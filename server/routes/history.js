const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Work} = require('../models/work.js');
const auth = require('../middleware/auth.js');
const path = require('path');

router.get('', (req, res) => {
    //send index.html page content, will direct to login page,
   
    console.log(path.join(__dirname, '../../public/index.html'))

    res.header('page', 'history').sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/jwt', auth, async(req, res) => {
    const decoded = req.user;

    const work = await Work.findOne({userId: decoded._id});

    if (!work) return res.status(404).send('Work document not found');
    
    let datesArray = work.dates;
    
    return res.send(datesArray);
});



module.exports = router;