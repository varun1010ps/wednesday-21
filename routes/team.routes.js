const teamControllers = require("../controllers/team.controllers");
const middleware = require("../middleware/admin.middle")

module.exports = function (app) {
    app.get("/api/v1/teamaccess", teamControllers.getallTeam);
    app.post(
        "/api/v1/teamaccess",
         teamControllers.createTeam
    );
    app.get("/api/v1/teamaccess/:id", teamControllers.findTeamById);
    app.post(
        "/api/v1/teamaccess/:id",
        teamControllers.updateTeam
    );
    app.post(
        "/api/v1/teamaccess/:id",
        teamControllers.deleteTeam
    );
}