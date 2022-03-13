const controller = require("../controllers/list.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/list/new", controller.newList);
  app.post("/api/list/getall", controller.getAllLists);
  app.post("/api/list/update", controller.updateList);
  app.post("/api/list/archive", controller.archiveList);
};
