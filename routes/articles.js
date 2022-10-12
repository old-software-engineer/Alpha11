const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articles/articles");
const authHelper = require("../utils/auth/auth");
const helper = require("../utils/shared");
const knex = require("../config/db");
const passport = require("../utils/auth/local");

router.get(
  "/articles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await articleController.findAll(req, res);
  }
);

router.get(
  "/articles/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await articleController.findOne(req, res);
  }
);

router.post(
  "/articles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await articleController.create(req, res);
  }
);

router.delete(
  "/articles/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await articleController.deleteArticle(req, res);
  }
);

router.patch(
  "/articles/update/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await articleController.updateArticle(req, res);
  }
);

module.exports = router;
