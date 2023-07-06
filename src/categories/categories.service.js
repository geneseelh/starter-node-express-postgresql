//require the knex instance initialized
const knex = require("../db/connection");

//declare a function called list() which builds a query that selects all columns from the categories table
function list() {
  return knex("categories").select("*");
}

// exports list() function so that it can be be required in other files
module.exports = {
  list,
};
