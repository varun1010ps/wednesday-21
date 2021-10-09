const Auth = require("../controllers/user.controllers");

module.exports = function (app) {
  app.get("/api/v1/", (req, res) => {
    res.status(200).json({
      message:
        "You are in the Auth Endpoint. Register or Login to test Authentication.",
    });
  });

  app.post("/api/v1/register", Auth.register);

  app.post("/api/v1/login", Auth.login);

  //EMAIL Verificationn
  app.get("/api/v1/verify/:token", Auth.verify);
  app.post("/api/v1/resend", Auth.resendToken);

  //Password RESET
  app.post("/api/v1/recover", Auth.recover);

  app.get("/api/v1/reset/:token", Auth.reset);

  app.post("/api/v1/reset/:token", Auth.resetPassword);
};
