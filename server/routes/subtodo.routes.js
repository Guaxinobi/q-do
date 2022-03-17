const controller = require("../controllers/subtodo.controller");
const { authJwt } = require("../middleware");
module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/subtodo/getall",
    authJwt.verifyToken,
    controller.getAllSubtodos
  );
  app.post(
    "/api/subtodo/newsubtodo",
    authJwt.verifyToken,
    controller.newSubtodo
  );
  app.post(
    "/api/subtodo/updatesubtodo",
    authJwt.verifyToken,
    controller.updateSubtodo
  );
  app.post(
    "/api/subtodo/archivesubtodo",
    authJwt.verifyToken,
    controller.archiveSubtodo
  );
  app.post(
    "/api/subtodo/checksubtodo",
    authJwt.verifyToken,
    controller.checkSubtodo
  );
  // app.post("/api/auth/signin", controller.signin);
  // app.post("/api/auth/refreshtoken", controller.refreshToken);
};
