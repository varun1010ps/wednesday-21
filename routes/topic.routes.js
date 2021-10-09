const Topic = require("../controllers/topic.controllers");

module.exports = function (app) {
    app.get("/api/v1/getAllTopic", Topic.getAllTopic );
    app.post("/api/v1/addTopic",Topic.addTopic);
    app.get("/api/v1/getTopic", Topic.getTopic );
    app.post("/api/v1/updateTopic", Topic.updateTopic);
    app.post("/api/v1/removeTopic", Topic.removeTopic);
    app.get("/api/v1/getAllTopicItems", Topic.getAllTopicItems );
    app.post("/api/v1/addTopicItem",Topic.addTopicItem);
}