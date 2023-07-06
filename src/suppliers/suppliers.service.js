const knex = require("../db/connection");

function create(supplier) {
  return knex("suppliers")
    .insert(supplier)
    .returning("*")
    .then((createdRecords) => createdRecords[0]); // [0] to to return only the one inserted record bc only one supplier will ever be inserted at a time
}

function read(supplier_id) {
  return knex("suppliers").select("*").where({ supplier_id }).first();
}

function update(updatedSupplier) {
  return knex("suppliers")
    .select("*")
    .where({ supplier_id: updatedSupplier.supplier_id })
    .update(updatedSupplier, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(supplier_id) {
  return knex("suppliers").where({ supplier_id }).del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
