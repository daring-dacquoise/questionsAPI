const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    return console.error(err.message);
  } else {
    console.log('connected to mysql');
  }
});

const dateConverter = function (num) {
  let date = new Date(Number(`${num}000`)).toISOString();
  return date;
};

const getQuestions = function (callback, productId) {
  connection.query(`SELECT questions.*, answers.id as answer_id, answers.body as answer_body, answers.date_written as answer_date, answers.answerer_name, answers.answerer_email, answers.helpful as answer_helpful, photos.answer_id as photos_answer_id, photos.url from questions left join answers on questions.id = answers.question_id left join photos on answers.id = photos.answer_id where questions.product_id = ${productId}`, function (err, data) {
    let result = {
      product_id: productId,
      results: []
    };
    data.forEach(question => {
      let questionObj = {
        question_id: question.id,
        question_body: question.body,
        question_date: dateConverter(question.date_written),
        asker_name: question.asker_name,
        question_helpfulness: question.helpful,
        reported: question.reported === 0 ? false : true,
        answers: {
          [question.answer_id]: {
            id: question.answer_id,
            body: question.answer_body,
            date: question.answer_date ? dateConverter(question.answer_date) : null,
            answerer_name: question.answerer_name,
            helpfulness: question.answer_helpful,
            photos: [question.url]
          }
        }
      }
      result.results.push(questionObj);

    });
    if (err) {
      console.log(err);
    } else {
      // data here is an array of question objects related to the product id
      // iterate through each object
      // for each object, create an empty answers object
      // create a query for that specific question id's answers
      //

      callback(null, result);
    }
  });
};

const getAnswers = function (callback, questionId) {
  connection.query(`select answers.*, photos.id as photos_id, photos.answer_id, photos.url from answers left join photos on answers.id = photos.answer_id where answers.question_id = ${questionId}`, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = {
  getQuestions, getAnswers
};