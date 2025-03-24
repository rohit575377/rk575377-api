// const mysql = require("mysql");
const mysql = require("mysql2");
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME
} = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = connection;