// Update with your config settings.
const path = require("path");
// requires & loads dotenv into the application code. dotenv loads env vars u defined in .env into process.env
require("dotenv").config();
// stores value of process.env.DATABASE_URL in a variable called DATABASE_URL
const { DATABASE_URL } = process.env;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    // sets location of database for dev env to DATABASE_URL
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};
