require("dotenv").config();
const knex = require("knex");
const dbEnv = process.env.DB_ENV || "development";
const config = require("./knexfile")[dbEnv];

module.exports = knex(config);
