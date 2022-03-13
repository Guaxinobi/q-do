const controller = require("../controllers/todo.controller");

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/todo/getall", controller.getAllTodos);
  app.post("/api/todo/newtodo", controller.newTodo);
  app.post("/api/todo/updatetodo", controller.updateTodo);
  app.post("/api/todo/archivetodo", controller.archiveTodo);
  app.post("/api/todo/checktodo", controller.checkTodo);
  // app.post("/api/auth/signin", controller.signin);
  // app.post("/api/auth/refreshtoken", controller.refreshToken);
};
