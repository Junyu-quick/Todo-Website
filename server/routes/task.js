//todo refactor code, so u dont repeat urself, make a function for finding the task obj for current date 
//create the route for creating new task for work, non work respectively
//this means the entire document 
const express = require('express');
const mongoose = require('mongoose');
const {Work} = require('../models/work.js');
const {NonWork} = require('../models/nonwork.js');
const auth = require('../middleware/auth.js');
const router = express.Router();
const isSameDay = require('../utils/date.js');

//creating new task 
router.post('/work', auth, async (req, res) => {
    const decoded = req.user;
    //!check other routes that use jwt, some might reference to _id wrongly as user._id
    const work = await Work.findOne({userId: decoded._id});

    //unlikely to occur
    if (!work) return res.send('Work document not found, likely cuz user not generated.')
   
    //finding the embded task doc for tdy date
    //if have then append new task
    work.dates.forEach(date => {
        if (isSameDay(date.date)) {
            const index = work.dates.indexOf(date);
            work.dates[index].toDo.push({
                task: req.body.task,
                eta: req.body.eta,
                completed: false
            })
            work.save();
            res.send(`Document for today's date exists, so new task appended to db.`)
        }
    })

    //if task document for today date dont exist
    //create new task embedded document 
    work.dates.push({
        date: new Date(),
        toDo: [{
            task: req.body.task,
            eta: req.body.eta,
            completed: false
        }]
    })
    work.save();

    res.send(`Work document for today's date does not exist, so new embedded task obj saved to db`)
})



//same but for nonwork
router.post('/nonwork', auth, async (req, res) => {
    const decoded = req.user;

    const nonWork = await NonWork.findOne({userId: decoded._id});

    //unlikely to occur
    if (!nonWork) return res.send('NonWork document not found, likely cuz user not generated.')
   
    //finding the embded task doc for tdy date
    //if have then append new task
    nonWork.dates.forEach(date => {
        if (isSameDay(date.date)) {
            const index = nonWork.dates.indexOf(date);
            nonWork.dates[index].toDo.push({
                task: req.body.task,
                eta: req.body.eta,
                completed: false
            })
            nonWork.save();
            res.send(`Document for today's date exists, so new task appended to db.`)
        }
    })

    //if task document for today date dont exist
    //create new task embedded document 
    nonWork.dates.push({
        date: new Date(),
        toDo: [{
            task: req.body.task,
            eta: req.body.eta,
            completed: false
        }]
    })
    nonWork.save();

    res.send(`NonWork document for today's date does not exist, so new embedded task obj saved to db`)
})



//updating work task by editing the task element on web
//whether user edit desc, eta or click completed circle
router.post('/updatework', auth, async (req, res) => {
    const decoded = req.user;
    
    const newTask = req.body;

    const work = await Work.findOne({userId: decoded._id});

    const dateObject = work.dates.find(element => isSameDay(element.date));
    if (!dateObject) res.send('Date obj cant be found, shouldnt happen')

    //edit the specific task obj
    const taskObject = dateObject.toDo
    if (!taskObject) res.send('Task obj cant be found, shouldnt happen')
   
    taskObject = newTask

    work.save();

    res.send('Success. Task object updated')
})


//updating nonwork task by editing the task element on web 
router.post('/updatenonwork', auth, async (req, res) => {
    const decoded = req.user;
    
    const newTask = req.body;

    const nonWork = await NonWork.findOne({userId: decoded._id});

    const dateObject = nonWork.dates.find(element => isSameDay(element.date));
    if (!dateObject) res.send('Date obj cant be found, shouldnt happen')

    //edit the specific task obj
    const taskObject = dateObject.toDo
    if (!taskObject) res.send('Task obj cant be found, shouldnt happen')
   
    taskObject = newTask

    nonWork.save();

    res.send('Success. Task object updated')
})


//deleting work task by tapping delete button
//deleting nonwork task by tapping delete button
module.exports = router;