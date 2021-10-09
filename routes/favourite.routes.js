const Favourite = require("../controllers/favourite.controllers");

module.exports = function (app) {
    app.post("/api/v1/addFavorite", Favourite.addFavorite );
    app.post("/api/v1/removeFavorite",Favourite.removeFavorite);
    app.post("/api/v1/isFavorite",Favourite.isFavorite);
    app.get("/api/v1/getFavourite", Favourite.getFavourite );
    app.get("/api/v1/getAllFavorite", Favourite.getAllFavorite)
}