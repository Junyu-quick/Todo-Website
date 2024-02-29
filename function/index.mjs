import {LambdaClient, GetAccountSettingsCommand} from '@aws-sdk/client-lambda';
// Create client outside of handler to reuse
const lambda = new LambdaClient();
import express from 'express';
const app = express();

// Handler
export const handler = async (event, context) => {
  require('./startup/db.js')();
  require('./startup/routes.js')(app);
}


// Use SDK client
var getAccountSettings = function(){
  return lambda.getAccountSettings().promise()
}