const { Pool } = require("pg");
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const db = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

db.query("SELECT 1")
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Error: ", err.message, { length: err.message.length }));

module.exports = db;

