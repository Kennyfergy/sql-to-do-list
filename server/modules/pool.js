const pg = require("pg");

const pool = new pg.Pool({
  database: "weekend_to_do_app",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on("connect", () => console.log("Connected in Postgres"));

pool.on("error", (err) => console.log("Error in connecting to Postgres", err));

module.exports = pool;
