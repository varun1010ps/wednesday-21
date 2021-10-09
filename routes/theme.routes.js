const themeContollers = require("../controllers/theme.contollers");
const middleware = require("../middleware/admin.middle")

module.exports = function (app) {
    app.get("/api/v1/theme", themeContollers.getallTheme);
    app.post(
        "/api/v1/theme",
         themeContollers.createTheme
    );
    app.get("/api/v1/theme/:id", themeContollers.findThemeById);
    app.post(
        "/api/v1/theme/:id",
        
        themeContollers.updateTheme
    );
    app.post(
        "/api/v1/theme/:id",
        
        themeContollers.deleteTheme
    );
}