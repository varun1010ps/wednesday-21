const passportService = require("../services/user.passport");
const passport = require("passport");

exports.userRequireAuth = (req, res, next) => {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) return next(err);

    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthorized Access - No Token Provided!" });

    req.user = user;

    next();
  })(req, res, next);
};
