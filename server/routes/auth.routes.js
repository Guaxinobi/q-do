const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    verifySignUp.checkDuplicateEmail,
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);

  app.get("/api/auth/logout", controller.logout);

  app.post("/api/auth/update", controller.updateUser);

  app.post("/api/auth/changepassword", controller.changePassword);

  app.post("/api/auth/refreshToken", controller.refreshToken);

  // app.post("/api/auth/signin", controller.signin);
  // app.post("/api/auth/refreshtoken", controller.refreshToken);
};
