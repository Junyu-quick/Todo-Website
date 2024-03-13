// Create client outside of handler to reuse
import express from 'express';
import {db} from './startup/db.js';
import {routes} from './startup/routes.js';
const app = express();

module.exports.handler = async (event, context) => {
  db();
  routes(app);
}



