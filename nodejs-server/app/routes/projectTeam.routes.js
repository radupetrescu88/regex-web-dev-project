const { verifyToken, isPM } = require("../middleware/authJwt");
const controller = require("../controllers/projectTeam.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/project-teams", [verifyToken, isPM], controller.create);

  app.get("/api/project-teams", [], controller.findAll);
};
