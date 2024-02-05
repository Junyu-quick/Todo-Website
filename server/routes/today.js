const express = require('express');
const router = express.Router();
const path = require('path');

router.get('', (req, res) => {
    //send index.html page content, will direct to login page,
   
    console.log(path.join(__dirname, '../../public/index.html'))

    res.header('page', 'today').sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router