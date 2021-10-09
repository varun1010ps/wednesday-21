const Stories = require("../controllers/stories.controllers");

module.exports = function (app) {
    app.get("/api/v1/getAllStories", Stories.getAllStories );
    app.post("/api/v1/addStories",Stories.addStories);
    app.get("/api/v1/getStories", Stories.getStories );
    app.post("/api/v1/updateStories", Stories.updateStories);
    app.post("/api/v1/removeStories", Stories.removeStories);
}