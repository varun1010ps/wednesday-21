const SessionBeta = require("../controllers/sessionBeta.controllers");

module.exports = function (app) {
    app.get("/api/v1/getAllSessionBeta", SessionBeta.getAllSessionBeta );
    app.post("/api/v1/addSessionBeta",SessionBeta.addSessionBeta);
    app.get("/api/v1/getSessionBeta", SessionBeta.getSessionBeta );
    app.post("/api/v1/updateSessionBeta", SessionBeta.updateSessionBeta);
    app.post("/api/v1/removeSessionBeta", SessionBeta.removeSessionBeta);
    app.get("/api/v1/getAllSessionBetaItems", SessionBeta.getAllSessionBetaItems );
    app.post("/api/v1/addSessionBetaItem",SessionBeta.addSessionBetaItem);
}
