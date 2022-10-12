const knex = require("../../config/db");
const helper = require("../../utils/shared");

async function create(req, res) {
  try {
    const fields = [req.body];
    const article = await knex.insert([...fields], ["id"]).into("articles");
    helper.handleResponseWithData(res, 200, article);
  } catch (err) {
    helper.handleResponse(res, 404, "Something Wrong");
  }
}

async function findAll(req, res) {
  try {
    const articles = await knex("articles");
    helper.handleResponseWithData(res, 200, articles);
  } catch (error) {
    console.log(error);
    helper.handleResponse(res, 404, "Something Wrong");
  }
}

async function findOne(req, res) {
  try {
    const article = await knex("articles").where("id", req.params.id);
    helper.handleResponseWithData(res, 200, article);
  } catch (error) {
    console.log(error);
    helper.handleResponse(res, 404, "Something Wrong");
  }
}

async function deleteArticle(req, res) {
  try {
    const article = await knex("articles").where("id", req.params.id).del();
    helper.handleResponseWithData(res, 200, article);
  } catch (error) {
    console.log(error);
    helper.handleResponse(res, 404, "Something Wrong");
  }
}

async function updateArticle(req, res) {
  try {
    const fields = req.body;
    console.log(fields);
    const article = await knex("articles")
      .where("id", req.params.id)
      .update({
        ...fields,
      });
    helper.handleResponseWithData(res, 200, article);
  } catch (error) {
    console.log(error, "error");
    helper.handleResponse(res, 404, "Something Wrong");
  }
}

module.exports = {
  create,
  findAll,
  findOne,
  deleteArticle,
  updateArticle,
};
