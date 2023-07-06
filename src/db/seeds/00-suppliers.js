// requires the suppliers seed data & stores it in the suppliers variable
const suppliers = require("../fixtures/suppliers");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex
  // RESTART IDENTITY resets the primary key values
    // CASCADE ensures that any references to the entries in the suppliers table are deleted as well when the entries are deleted
    .raw("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE")
    .then(function () {
      // ensures that this line will only get executed after the preceding knex.raw() function is complete.
      return knex("suppliers").insert(suppliers);
    });
};
