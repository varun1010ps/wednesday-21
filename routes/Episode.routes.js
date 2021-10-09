const episodeController = require("../controllers/episode.controllers");
const middleware = require("../middleware/admin.middle")

module.exports = function (app) {
    app.get("/api/v1/episode", episodeController.getallEpisode);
    app.post(
        "/api/v1/episode",
         episodeController.createEpisode
    );
    app.get("/api/v1/episode/:id", episodeController.findEpisodeById);
    app.post(
        "/api/v1/episode/:id",
        
        episodeController.updateEpisode
    );
    app.post(
        "/api/v1/episode/:id",
        
        episodeController.deleteEpisode
    );
}