const passportService = require("../services/admin.passport");
const passport = require("passport");

exports.adminRequireAuth = (req, res, next) => {
  passport.authenticate("jwt", function (err, admin, info) {
    if (err) return next(err);

    if (!admin)
      return res
        .status(401)
        .json({ message: "Unauthorized Access - No Token Provided!" });

    req.admin = admin;

    next();
  })(req, res, next);
};
