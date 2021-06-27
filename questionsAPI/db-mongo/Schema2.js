const questionSchema = new Schema({
  "product_id": Number,
  "questions": [{
    "question_id": {
      type: 'String',
      required: true
    },
    "question_body": String,
    "question_date": String,
    "asker_name": String,
    "question_helpfulness": {
      type: 'Number',
      default: 0
    },
    "reported": Boolean
        "answers": [
      answer_id: {
        "id": Number,
        "body": String,
        "date": String,
        "answerer_name": String,
        "helpfulness": {
          type: 'Number',
          default: 0
        },
        "photos": [String]
          ]
  }
      }
  ]
})

module.exports = { questionSchema };