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
    let work = await Work.findOne({userId: decoded._id});

    //unlikely to occur
    if (!work) return res.send('Work document not found, likely cuz user not generated.')
   
    //finding the embded task doc for tdy date
    //if have then append new task
    // 
    let forLoopRan = false;
    for (const date of work.dates) {
        if (isSameDay(date.date)) {
            const index = work.dates.indexOf(date);
            work.dates[index].toDo.push({
                task: req.body.task,
                eta: req.body.eta,
                completed: false
            })
            forLoopRan = true;
            break;
        }
    }

    if (forLoopRan) {
        await work.save();
        console.info(`Document for today's date exists, so new task appended to db.`);
        return res.send(`Document for today's date exists, so new task appended to db.`);
    };

    //if task document for today date dont exist
    //create new task embedded document 
    work.dates.push({
        toDo: [{
            task: req.body.task,
            eta: req.body.eta,
            completed: false
        }]
    })
    console.info(`embedded todo document(current date's) for current user dont exist/empty, thus creating one.`)
    await work.save();

    return res.send(`embedded todo document(current date's) for current user dont exist/empty, thus creating one.`)
})



//same but for nonwork
router.post('/nonwork', auth, async (req, res) => {
    const decoded = req.user;
    let nonWork = await NonWork.findOne({userId: decoded._id});

    //unlikely to occur
    if (!nonWork) return res.send('NonWork document not found, likely cuz user not generated.')
   
    //finding the embded task doc for tdy date
    //if have then append new task
    let forLoopRan = false;
    for (const date of nonWork.dates) {
        if (isSameDay(date.date)) {
            const index = nonWork.dates.indexOf(date);
            nonWork.dates[index].toDo.push({
                task: req.body.task,
                eta: req.body.eta,
                completed: false
            })
            forLoopRan = true;
            break;
        }
    }

    if (forLoopRan) {
        await nonWork.save();
        console.info(`NonWork document for today's date exists, so new task appended to db.`);
        return res.send(`Document for today's date exists, so new task appended to db.`);
    };

    //if task document for today date dont exist
    //create new task embedded document 
    nonWork.dates.push({
        toDo: [{
            task: req.body.task,
            eta: req.body.eta,
            completed: false
        }]
    })
    console.info(`embedded nonWork todo document(current date's) for current user dont exist/empty, thus creating one.`)
    await nonWork.save();

    return res.send(`embedded nonWork todo document(current date's) for current user dont exist/empty, thus creating one.`)
})



//updating work task by editing the task element on web
//whether user edit desc, eta or click completed circle
router.post('/updatework', auth, async (req, res) => {
    const decoded = req.user;
    
    const newTask = req.body;
    console.log(req.body);

    let work = await Work.findOne({userId: decoded._id});

    let dateObject = work.dates.find(element => isSameDay(element.date));
    let i = work.dates.indexOf(dateObject);

    work.dates[i].toDo = newTask;

    await work.save();

    res.send('Success. Task object updated')
})


//updating nonwork task by editing the task element on web 
router.post('/updatenonwork', auth, async (req, res) => {
    const decoded = req.user;
    
    const newTask = req.body;

    let nonWork = await NonWork.findOne({userId: decoded._id});

    let dateObject = nonWork.dates.find(element => isSameDay(element.date));
    let i = nonWork.dates.indexOf(dateObject);

    nonWork.dates[i].toDo = newTask;

    await nonWork.save();

    res.send('Success. Task object updated')
})

//pushing uncomplete work tasks to the next day
router.post('/work/push', auth, async (req, res) => {
    const decoded = req.user;

    let work = await Work.findOne({userId: decoded._id});

    const taskObjectArray = req.body;

    let currentDate = new Date();
    let tmrDate = new Date(currentDate);
    tmrDate.setDate(currentDate.getDate() + 1);
    tmrDate.setHours(0,0,0,0);


    const dateObject =  {
        date: tmrDate,
        toDo: taskObjectArray
    }


    if (JSON.stringify(work.dates[work.dates.length - 1].date) == JSON.stringify(tmrDate)) {
        //2nd/more times pushing, thus tmr date obj alr created 
        console.log('Non-first time pushing work task to tmr.')
        work.dates[work.dates.length - 1] = dateObject;
    } else {
        //first time pushing, thus tmr's date obj not created
        work.dates.push(dateObject);
        console.log('First time pushing work task to tmr.')

    }

    await work.save();
    
    console.log('work task pushed successfully')
    res.send("Sucessfully pushed uncompleted tasks.")
});


//pushing uncomplete work tasks to the next day
router.post('/nonwork/push', auth, async (req, res) => {
    const decoded = req.user;

    let nonWork = await NonWork.findOne({userId: decoded._id});

    const taskObjectArray = req.body;

    let currentDate = new Date();
    let tmrDate = new Date(currentDate);
    tmrDate.setDate(currentDate.getDate() + 1);
    tmrDate.setHours(0,0,0,0);


    const dateObject =  {
        date: tmrDate,
        toDo: taskObjectArray
    }


    if (JSON.stringify(nonWork.dates[nonWork.dates.length - 1].date) == JSON.stringify(tmrDate)) {
        //2nd/more times pushing, thus tmr date obj alr created 
        console.log('Non-first time pushing work task to tmr.')
        nonWork.dates[nonWork.dates.length - 1] = dateObject;
    } else {
        //first time pushing, thus tmr's date obj not created
        nonWork.dates.push(dateObject);
        console.log('First time pushing work task to tmr.')

    }

    await nonWork.save();
    
    console.log('NonWork task pushed successfully')
    res.send("Sucessfully pushed uncompleted tasks.")
});


module.exports = router;