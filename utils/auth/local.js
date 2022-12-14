const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const init = require("./passport");
const knex = require("../../config/db");
const authHelper = require("./auth");

init();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "random string";

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await knex("users").where({ username }).first();

    if (!user) return done(null, false, { message: "Incorect Username" });
    if (!authHelper.comparePass(password, user.password)) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  })
);

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    done(null, true);
  })
);
module.exports = passport;
