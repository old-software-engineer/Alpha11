const bcrypt = require("bcryptjs");
const knex = require("../../config/db");

function createUser(req, res) {
  return handleErrors(req)
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.password, salt);
      return knex("users")
        .insert({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        })
        .returning("*");
    })
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    if (req.body.username.length < 6) {
      reject({
        message: "Username must be longer than 6 characters",
      });
    } else if (req.body.password.length < 6) {
      reject({
        message: "Password must be longer than 6 characters",
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  createUser,
  comparePass,
  handleErrors,
};
