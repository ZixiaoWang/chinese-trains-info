const express = require('express');
const app = express();
const colors = require('colors');
const path = require('path');

app.use('/data', express.static(path.resolve(__dirname, 'data')));
app.use(express.static(path.resolve(__dirname, 'static')));

app.listen(3000, (request, response) => {
    console.log(`SERVER IS LISTENING TO ${ colors.green('3000') }`);
})
