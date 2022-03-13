const db = require("../models");
const config = require("../config/auth.config");
const { user: User, list: List } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.changeNameEmail = (req, res) => {
  User.update(
    { username: req.body.username, email: req.body.email },
    { where: { id: req.body.userid } }
  )
    .then((user) => {
      res.send({ message: "User data was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
exports.changePassword = (req, res) => {
  User.update(
    { password: bcrypt.hashSync(req.body.password, 8) },
    { where: { id: req.body.userid } }
  )
    .then((user) => {
      res.send({ message: "User data was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
