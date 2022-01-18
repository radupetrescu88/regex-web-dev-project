const { verifyToken, isPM, isPMorTST } = require("../middleware/authJwt");
const controller = require("../controllers/project.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/projects", [verifyToken, isPM], controller.create);

  app.put("/api/projects/:id", [verifyToken, isPM], controller.update);

  app.get("/api/projects", [], controller.findAll);

  app.get("/api/projects/:id", [verifyToken, isPMorTST], controller.findById);

  app.get(
    "/api/projects/by-team/:id",
    [verifyToken, isPMorTST],
    controller.findAllByTeam
  );
};
