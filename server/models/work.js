//used for work collection
//todo add validator next time when done 
const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        default: 'Begin your journey!'
    },
    eta: {
        type: String,
        required: true,
        default: '00'

    },
    completed: {
        type: Boolean, 
        required: true,
        default: false

    }
})

const dateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    toDo: [toDoSchema]
})

const workSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }, 
    dates: [dateSchema]
})

const Work = mongoose.model('Work', workSchema);    

exports.Work = Work;