const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
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

  app.get("/api/auth/logout", authJwt.verifyToken, controller.logout);

  app.post("/api/auth/update", authJwt.verifyToken, controller.updateUser);

  app.post(
    "/api/auth/changepassword",
    authJwt.verifyToken,
    controller.changePassword
  );

  app.post(
    "/api/auth/refreshToken",
    authJwt.verifyToken,
    controller.refreshToken
  );

  // app.post("/api/auth/signin", controller.signin);
  // app.post("/api/auth/refreshtoken", controller.refreshToken);
};
