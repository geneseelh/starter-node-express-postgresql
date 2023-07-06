/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("product_id").primary(); // Sets `product_id` as the primary key
    table.string("product_sku");
    table.string("product_name");
    table.text("product_description");
    table.integer("product_quantity_in_stock");
    table.decimal("product_weight_in_lbs");
    table.integer("supplier_id").unsigned().notNullable(); // can chain unsigned() to prevent neg values    from being inserted into the supplier_id column. notNullable() ensures that supplier_id cannot be null
    table // creates a foreign key constraint called supplier_id, which references the primary key of the suppliers table
      .foreign("supplier_id")
      .references("supplier_id")
      .inTable("suppliers")
      .onDelete("cascade"); // Chaining onDelete("cascade") means that if a supplier is deleted, then all the products related to the supplier will be deleted from the database as well
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
