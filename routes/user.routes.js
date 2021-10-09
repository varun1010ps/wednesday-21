const userController = require("../controllers/user.controllers");
const middleware = require("../middleware/admin.middle")

module.exports = function (app) {
    app.get("/api/v1/user", userController.getallUser);
    app.get("/api/v1/user/:id", userController.findUserById);
    app.post("/api/v1/user/:id", userController.deleteUser);
    app.post("/api/v1/updateUser", userController.updateUser);
    app.post("/api/v1/updateImage", userController.updateImage);
}