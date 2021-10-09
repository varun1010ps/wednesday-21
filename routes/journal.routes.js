const Journal = require("../controllers/journal.controllers");

module.exports = function (app) {
    app.get("/api/v1/getAllJournal", Journal.getAllJournal );
    app.post("/api/v1/addJournal",Journal.addJournal);
    app.get("/api/v1/getJournal", Journal.getJournal );
    app.post("/api/v1/updateJournal", Journal.updateJournal);
    app.post("/api/v1/removeJournal", Journal.removeJournal);
}