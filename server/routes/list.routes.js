const controller = require("../controllers/list.controller");
const { authJwt } = require("../middleware");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/list/new", authJwt.verifyToken, controller.newList);
  app.post("/api/list/getall", authJwt.verifyToken, controller.getAllLists);
  app.post("/api/list/update", authJwt.verifyToken, controller.updateList);
  app.post("/api/list/archive", authJwt.verifyToken, controller.archiveList);
};
