// connect to db postgresql
const { Pool } = require("pg");

const { dbHost, dbName, dbUser, dbPass } = require("./environments");

// connect to db
const db = new Pool({
  host: dbHost,
  database: dbName,
  user: dbUser,
  password: dbPass,
});

module.exports = db;
