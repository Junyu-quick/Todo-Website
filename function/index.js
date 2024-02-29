import {LambdaClient, GetAccountSettingsCommand} from '@aws-sdk/client-lambda';
// Create client outside of handler to reuse
const lambda = new LambdaClient();
import express from 'express';
import db from './startup/db.js';
import routes from './startup/routes.js';
const app = express();

// Handler
export const handler = async (event, context) => {
  db();
  routes(app);
}


// Use SDK client
var getAccountSettings = function(){
  return lambda.getAccountSettings().promise()
}