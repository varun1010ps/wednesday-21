const JournalQuestion = require("../controllers/journalQuestion.controllers");

module.exports = function (app) {
    app.get("/api/v1/getAllJournalQuestion", JournalQuestion.getAllJournalQuestion);
    app.get("/api/v1/getAllJournalQuestionForUser", JournalQuestion.getAllJournalQuestionForUser );
    app.post("/api/v1/addJournalQuestion",JournalQuestion.addJournalQuestion);
    app.get("/api/v1/getJournalQuestion", JournalQuestion.getJournalQuestion );
    app.post("/api/v1/updateJournalQuestion", JournalQuestion.updateJournalQuestion);
    app.post("/api/v1/removeJournalQuestion", JournalQuestion.removeJournalQuestion);
}
