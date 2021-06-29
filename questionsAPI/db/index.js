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