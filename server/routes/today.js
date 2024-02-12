const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/user.js');
const {Work} = require('../models/work.js');
const {NonWork} = require('../models/nonwork.js');
const auth = require('../middleware/auth.js');
const path = require('path');
const isSameDay = require('../utils/date.js');

router.get('', (req, res) => {
    //send index.html page content, will direct to login page,
    console.log(path.join(__dirname, '../../public/index.html'))

    res.header('page', 'today').sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/jwt', auth, async(req, res) => {
    const decoded = req.user;

    //if auth passed, then confirm will have user doc, but if no then error handling middle ware will settle 
    //to retrieve the the array of work todos
    let work = await Work.findOne({userId: decoded._id});
    if (work === null) return res.status(404).send("Entire work document not generated, display default.")

    let workData;
    try {
        work.dates.some((date) => {
            if (isSameDay(date.date)){
                workData = date.toDo
                return true 
            }
        }) 
    }
    catch(err) {
        console.log('work document for today not found, display default.')
        res.status(404).send('work document for today not found, display default.')
    }


    //error handling middleware will handle if cant find this doc
    //to retrieve the the array of nonwork todos
    const nonWork = await NonWork.findOne({userId: decoded._id});
    if (nonWork === null) return res.status(404).send("Entire nonWork document not generated, display default.")

    let nonWorkData;
    try {
        nonWork.dates.some((date) => {
            if (isSameDay(date.date)){
                nonWorkData = date.toDo
                return true 
            }
        }) 
    }
    catch(error) {
        console.log('nonWork document for today not found, display default.')
        res.status(404).send('nonWork document for today not found, display default.')
    }
    
    //client side handle if not workData,nonWorkData for the day
    //to send the todos for work and nonwork to client side  
    const data = {
        workData: workData,
        nonWorkData: nonWorkData
    };
    
    res.send(data)
})

module.exports = router