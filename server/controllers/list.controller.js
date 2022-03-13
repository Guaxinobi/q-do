const db = require("../models");
const { user: User, list: List } = db;
const jwt = require("jsonwebtoken");

exports.getAllLists = async (req, res) => {
  console.log(req.body);
  let lists = await List.findAll({
    where: { userId: req.body.userId, archived: false },
  });
  if (!lists) return res.send(404).send({ message: "No lists found." });
  res.status(200).send(lists);
};

exports.newList = async (req, res) => {
  console.log("newList.req: ", req);
  let user = await User.findOne({
    where: {
      id: req.body.userId,
    },
  });
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  let list = await List.create({
    title: req.body.title,
    userId: req.body.userId,
    archived: false,
  });
  if (!list) return res.send(500).send({ message: err });
  res.status(200).send(list);
};

exports.updateList = async (req, res) => {
  console.log("newList.req: ", req);
  let user = await User.findOne({
    where: {
      id: req.body.userId,
    },
  });
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  let list = List.update(
    {
      title: req.body.title,
    },
    { where: { id: req.body.listId } }
  );
  if (!list) return res.send(500).send({ message: err });
  res.status(200).send(list);
};

exports.archiveList = async (req, res) => {
  let user = await User.findOne({
    where: {
      id: req.body.userId,
    },
  });
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  let list = List.update(
    {
      archived: true,
    },
    { where: { id: req.body.listId } }
  );
  if (!list) return res.send(500).send({ message: err });
  res.status(200).send(list);
};
