const passport = require("passport");
const knex = require("../../config/db");

module.exports = () => {
  passport.serializeUser((user, done) => {
    if (user) {
      return done(null, user.id);
    }
    return done(null, false);
  });

  passport.deserializeUser((id, done) => {
    knex("users")
      .where({ id })
      .first()
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};
