const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// group the category_id, category_name, and category_description columns into a single nested object
    // values specify the "path" of the property, where . is the delimiter(. is used like / or \ for a path folder delimiter)
const addCategory = mapProperties({
  category_id: "category.category_id",
  category_name: "category.category_name",
  category_description: "category.category_description",
});

function list() {
  return knex("products").select("*");
}

// returns a specific product, including all of its related category information
function read(product_id) {
  return knex("products as p")
    .join("products_categories as pc", "p.product_id", "pc.product_id")
    .join("categories as c", "pc.category_id", "c.category_id")
    .select("p.*", "c.*")
    .where({ "p.product_id": product_id })
    .first()
    .then(addCategory);
}

function listOutOfStockCount() {
  return (
    knex("products")
      // selects this column from the products table
      .select("product_quantity_in_stock as out_of_stock")
      // selects a count of all the products
      .count("product_id")
      // where it is set to 0
      .where({ product_quantity_in_stock: 0 })
      // then groups the result by the out_of_stock column
      .groupBy("out_of_stock")
  );
}

function listPriceSummary() {
  return (
    knex("products")
      //selects supplier_id column from products table
      .select("supplier_id")
      //then returns min max & avg values of that column
      .min("product_price")
      .max("product_price")
      .avg("product_price")
      //grouped by the supplier_id column
      .groupBy("supplier_id")
  );
}

function listTotalWeightByProduct() {
  return (
    knex("products")
      //selects two columns
      .select(
        "product_sku",
        "product_title",
        //and a special third column that consists of the sum of multiplying the values from two columns from the products table
        knex.raw(
          "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
        )
      )
      //result is then grouped by product_title & product_sku
      .groupBy("product_title", "product_sku")
  );
}

module.exports = {
  list,
  read,
  listOutOfStockCount,
  listPriceSummary,
  listTotalWeightByProduct,
};
