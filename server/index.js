const express = require('express');
const app = express();

require('./startup/db.js')();
require('./startup/routes.js')(app);


const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log('listening on port 3000...'))