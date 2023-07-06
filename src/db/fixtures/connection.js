// determines current env where the application code is running & stores the value in the env var. if isnt defined, set value to "development"
const env = process.env.NODE_ENV || "development";
// requires the database configuration obj from the knexfile.js for the current env & stores it in the config variable
const config = require("../../knexfile")[env];
// initializes a knex instance by calling the knex module, passing in config as an argument
const knex = require("knex")(config);

//exports the knex instance so that other files can require it
module.exports = knex;
