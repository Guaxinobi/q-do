const controller = require("../controllers/todo.controller");
const { authJwt } = require("../middleware");
module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/todo/getall", authJwt.verifyToken, controller.getAllTodos);
  app.post("/api/todo/newtodo", authJwt.verifyToken, controller.newTodo);
  app.post("/api/todo/updatetodo", authJwt.verifyToken, controller.updateTodo);
  app.post(
    "/api/todo/archivetodo",
    authJwt.verifyToken,
    controller.archiveTodo
  );
  app.post("/api/todo/checktodo", authJwt.verifyToken, controller.checkTodo);
  // app.post("/api/auth/signin", controller.signin);
  // app.post("/api/auth/refreshtoken", controller.refreshToken);
};
