const express = require('express');
const path = require('path');
const index = require('../routes/index.js');
const user = require('../routes/user.js');
const login = require('../routes/login.js');
const today = require('../routes/today.js');
const longterm = require('../routes/longterm.js');
const history = require('../routes/history.js');

module.exports = function(app) {
    app.use(express.static(path.join(__dirname, '../../public')));
    app.use(express.json());
    app.use('', index);
    app.use('/user', user);
    app.use('/login', login);
    app.use('/today', today);
    app.use('/longterm', longterm);
    app.use('/history', history);
}