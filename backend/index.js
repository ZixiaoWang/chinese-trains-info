const express = require('express');
const app = express();
const colors = require('colors');
const path = require('path');
const cors = require('cors');

const { getLeftTickets } = require('./services/get_left_tickets');

const RESTFUL_API_BASE = '/api/v1';

app.use(cors());
app.use('/data', express.static(path.resolve(__dirname, '../data')));
app.use(express.static(path.resolve(__dirname, '../static')));

app.get(RESTFUL_API_BASE + '/leftTickets', getLeftTickets);

app.listen(80, (request, response) => {
    console.log(`SERVER IS LISTENING TO ${ colors.green('80') }`);
})
