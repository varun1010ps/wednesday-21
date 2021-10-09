const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user.models");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.secret,
};
const keys = require("../config/key");

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, User) {
    if (err) {
      return done(err, false);
    }
    if (User) {
      done(null, User);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
