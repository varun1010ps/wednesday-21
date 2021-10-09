const orgControllers = require("../controllers/Organization.controllers");

module.exports = (app) => {
  // app.get("/api/v1/org", function (req, res) {
  //   res.send("hello");
  // });
  app.get("/api/v1/org", orgControllers.getallOrg);
  app.post("/api/v1/org", orgControllers.createOrg);
  app.get("/api/v1/org/:id", orgControllers.findOrgById);
  app.post(
    "/api/v1/org/:id",
    orgControllers.updateOrg
  );
  app.post(
    "/api/v1/org/:id",
    orgControllers.deleteOrg
  );
};
