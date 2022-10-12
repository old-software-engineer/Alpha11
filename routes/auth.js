const express = require("express");
const router = express.Router();

const authHelper = require("../utils/auth/auth");
const helper = require("../utils/shared");
const knex = require("../config/db");
const passport = require("../utils/auth/local");

router.post("/register", async (req, res) => {
  const user = await knex("users").where({ email: req.body.email }).first();
  if (user) {
    return helper.handleResponse(res, 401, "user already exist");
  } else {
    return authHelper
      .createUser(req, res)
      .then((response) => {
        const user = response[0];
        const payload = {
          username: user.username,
          id: user.id,
          email: user.email,
        };
        const token = helper.jwtTokenCreation(payload);
        helper.handleResponseWithData(res, 200, {
          user,
          token: "Bearer " + token,
        });
      })
      .catch((err) => {
        helper.handleResponse(res, 500, "error");
      });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user) {
    helper.handleResponse(res, 401, req.messages);
  }
  const payload = {
    username: req.user.username,
    id: req.user.id,
    email: req.user.email,
  };

  const token = helper.jwtTokenCreation(payload);

  res.status(200).send({
    success: true,
    message: "Logged in Successfully",
    token: "Bearer " + token,
    user: payload,
  });
});

module.exports = router;
