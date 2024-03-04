import express from 'express';
import { Command } from 'commander';
import { getVariables } from './config.js';

const app = express();
const program = new Command();
program.option('--mode <mode>', 'Modo de trabajo', 'production');
const options = program.parse();

const { port, clientID, clientSecret } = getVariables(options);

console.log("ClientID: "+clientID)

console.log("Client Secret: "+clientSecret)
app.listen(port, () => {
    console.log(`Listening on ${port}`);
})