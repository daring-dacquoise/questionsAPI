const express = require('express');
const bodyParser = require('body-parser');

const db = require('../db');

const app = express();

// change to port 80 only in EC2 instance
// sudo npm start
// port # not needed if it is 80
const PORT = 3000;

// middleware that intercepts the requests
app.use(bodyParser.json());

// TO DO: route to get all questions
app.get('/qa/questions/:product_id', (req, res) => {
  db.getQuestions((err, data) => {
    if (err) {
      res.status(404).send('error');
    } else {
      res.status(200).send(data);
    }
  }, req.params.product_id);
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  db.getAnswers((err, data) => {
    if (err) {
      res.status(404).send('error');
    } else {
      res.status(200).send(data);
    }
  }, req.params.question_id);
});

// TO DO: route to post an answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  db.postAnswer((err, data) => {
    if (err) {
      res.status(404).send('error');
    } else {
      res.status(200).send(data);
    }
  }, req.body, req.params.question_id);

  if (!(req.body.photos.length === 0)) {
    db.postPhoto((err, data) => {
      if (err) {
        cosnole.log('error');
      } else {
        console.log('photos successfully sent');
      }
    }, req.body.photos);
  }
});
// TO DO: route to update helpfulness

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

