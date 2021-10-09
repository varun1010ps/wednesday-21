const subcontrollers = require("../controllers/subscription.controllers");

module.exports = function (app) {
  app.post("/api/v1/sub", subcontrollers.createSubscription);
  app.post("/api/v1/sub-cancel", subcontrollers.deleteSub);
  app.post("/webhooks", subcontrollers.webhook_sub);
  app.post("/create-checkout-session", subcontrollers.CheckSessions);
  app.post("/billing-portal", subcontrollers.billingSessions);
};
