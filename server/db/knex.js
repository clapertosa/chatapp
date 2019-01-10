const knex = require("knex");
const environment = require("../knexfile");

module.exports = knex(environment[process.env.NODE_ENV || "development"]);
