const db = require("../models");
const config = require("../config/auth.config");
const { user: User, refreshToken: RefreshToken } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const req = require("express/lib/request");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
      let refreshToken = await RefreshToken.createToken(user);

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
        refreshToken: refreshToken,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });
    console.log(refreshToken);
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }
    const user = await refreshToken.getUser();
    console.log("###################USER: ", user);
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: newAccessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.logout = async (req, res) => {
  // Set token to none and expire after 5 seconds
  res.cookie("access-token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

exports.changePassword = async (req, res) => {
  let user = User.findOne({
    where: {
      id: req.body.userId,
      password: bcrypt.hashSync(req.body.oldPassword, 8),
    },
  });
  if (!user)
    return res
      .status(404)
      .send({ message: "User not found or password invalid" });
  let editedUser = await User.update(
    { password: bcrypt.hashSync(req.body.newPassword, 8) },
    { where: { id: req.body.userid } }
  );

  res.status(200).send({
    editedUser,
  });
};

exports.updateUser = async (req, res) => {
  let user = await User.findOne({ where: { id: req.body.userId } });
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  let editedUser = await User.update(
    { username: req.body.username },
    { where: { id: user.id } }
  );
  if (!editedUser)
    return res.status(500).send({ message: "User data not edited." });

  res.status(200).send({
    editedUser,
  });
};
