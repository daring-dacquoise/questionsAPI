// import express
const express = require('express');
const mongoose = require('./db-mongo/connection.js');
// create a web server with express
const app = express();
// specify the port
const port = 3111;

// make routes
app.get('/test', (req, res) => res.send('working'));
// listening for requests

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});