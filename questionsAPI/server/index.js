const express = require('express');
const bodyParser = require('body-parser');

const db = require('../db');

const app = express();

const PORT = 3000;

// middleware that intercepts the requests
app.use(bodyParser.json());

// TO DO: route to get all questions
// TO DO: route to post an answer
// TO DO: route to update helpfulness

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

