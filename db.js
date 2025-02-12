const { Pool } = require("pg");

const pool = new Pool({
  host: "db",
  port: "5432",
  user: "user1",
  password: "password1",
  database: "db123",
});

module.exports = pool;
