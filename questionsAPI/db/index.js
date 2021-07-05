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
  connection.query(`SELECT questions.*, answers.id as answer_id, answers.body as answer_body, answers.date_written as answer_date, answers.answerer_name, answers.answerer_email, answers.helpful as answer_helpful, photos.answer_id as photos_answer_id, photos.url from questions left join answers on questions.id = answers.question_id left join photos on answers.id = photos.answer_id where questions.product_id = ${productId} order by helpful desc, answer_helpful desc`, function (err, data) {

    // console.log(data);
    /*experimentation
    SELECT q.*, answers.id as answer_id, answers.body as answer_body, answers.date_written as answer_date, answers.answerer_name, answers.answerer_email, answers.helpful as answer_helpful, photos.answer_id as photos_answer_id, photos.url from (select * from questions order by helpful desc limit 5) q left join answers on q.id = answers.question_id left join photos on answers.id = photos.answer_id where q.product_id = 2 order by answer_helpful desc

    select q.*, answers.id as answer_id, answers.body as answer_body, answers.date_written as answer_date, answers.answerer_name, answers.answerer_email, answers.helpful as answer_helpful, photos.answer_id as photos_answer_id, photos.url from (select * from questions where product_id = 2 order by helpful desc limit 5) q left join answers on q.id = answers.question_id left join photos on answers.id = photos.answer_id order by answer_helpful desc;

    SELECT q.*, a.*, photos.answer_id, photos.url FROM (SELECT * FROM questions WHERE product_id = 3 ORDER BY helpful DESC LIMIT 5) q LEFT JOIN (SELECT answers.id as answer_id, answers.body as answer_body, answers.date_written as answer_date, answers.answerer_name, answers.answerer_email, answers.helpful as answer_helpful, question_id FROM answers ORDER BY answer_helpful desc) a ON q.id = a.question_id left join photos on a.answer_id = photos.answer_id;
    */

    let result = {
      product_id: productId,
      results: []
    };

    data.forEach(question => {
      let questionIndex = result.results.findIndex(x => x.question_id === question.id)

      let questionObj = {
        question_id: question.id,
        question_body: question.body,
        question_date: dateConverter(question.date_written),
        asker_name: question.asker_name,
        question_helpfulness: question.helpful,
        reported: question.reported === 0 ? false : true,
        answers: (question.answer_id ? {
          [question.answer_id]: {
            id: question.answer_id,
            body: question.answer_body,
            date: question.answer_date ? dateConverter(question.answer_date) : null,
            answerer_name: question.answerer_name,
            helpfulness: question.answer_helpful,
            photos: question.url ? [question.url] : []
          }
        } : {})
      }

      if (result.results.length === 0 || questionIndex === -1) {
        result.results.push(questionObj);
      } else {
        result.results[questionIndex].answers[question.answer_id] ?
          result.results[questionIndex].answers[question.answer_id].photos.push(question.url) :
          result.results[questionIndex].answers[question.answer_id] =
          {
            id: question.answer_id,
            body: question.answer_body,
            date: question.answer_date ? dateConverter(question.answer_date) : null,
            answerer_name: question.answerer_name,
            helpfulness: question.answer_helpful,
            photos: question.url ? [question.url] : []
          }
      }
      // console.log(questionIndex, 'this is index of question in results array');
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

const postAnswer = function (callback, answer, questionId) {
  let todate = new Date();
  let ms = Math.floor(todate.getTime() / 1000);


  connection.query(`INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (${questionId}, "${answer.body}", ${ms}, "${answer.name}", "${answer.email}", 0, 0)`, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
}

// connection.query('SELECT MAX(id) from answers', function (err, id) {
//   let nextAnswerId;
//   if (err) {
//     console.log(err);
//   } else {
//     nextAnswerId = JSON.parse(JSON.stringify(id))[0]['MAX(id)'];
//     console.log(nextAnswerId);
//   }
// });

const postPhoto = function (callback, photos) {
  connection.query('SELECT MAX(id) from answers', function (err, id) {
    let nextAnswerId;
    if (err) {
      console.log(err);
    } else {
      nextAnswerId = JSON.parse(JSON.stringify(id))[0]['MAX(id)'];
      photos.forEach((photoURL) => {
        connection.query(`INSERT INTO photos (answer_id, url) VALUES ("${nextAnswerId}", "${photoURL}")`, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            callback(null, data);
          }
        });
      });
    }
  });
}

module.exports = {
  getQuestions, getAnswers, postAnswer, postPhoto
};

