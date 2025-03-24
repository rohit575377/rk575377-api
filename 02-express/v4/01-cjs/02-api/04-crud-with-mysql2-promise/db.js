const mysql = require("mysql2/promise");
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
});

connection.execute("SELECT 1")
  .then(() => console.log("Connected to MySQL database"))
  .catch((err) => console.error(err));

module.exports = connection;

