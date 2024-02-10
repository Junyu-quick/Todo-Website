const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    eta: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean, 
        required: true
    }
})

const dateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    toDo: [toDoSchema]
})

const nonWorkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }, 
    dates: [dateSchema]
})

const NonWork = mongoose.model('NonWork', nonWorkSchema);    

exports.NonWork = NonWork;