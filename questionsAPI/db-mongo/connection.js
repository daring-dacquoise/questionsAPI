const mongoose = require('mongoose');
const mongoDatabase = require('./Schema2.js');
// create a connection to the database
//Two part to the connection 1. is a uri, that has the address and the database
//Two is any connection options
mongoose.connect('mongodb://localhost:27017/questions', { useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
  if (error) {
    console.log(error);
    return
  }
  console.log('connected')

});

// hw: find a way to make a route for post


