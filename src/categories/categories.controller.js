// require service object u created in the previous step and assigns it to categoriesService
const categoriesService = require("./categories.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");                                               

async function list(req, res) {
  //categoriesService.list() function executes a knex query (an async operation)
  //await forces executiion of code to pause on that line until that async operation is finished
  //when finished, resolved response is stored in data
  const data = await categoriesService.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
