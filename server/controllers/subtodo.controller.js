const db = require("../models");
const { todo: Todo, subtodo: Subtodo } = db;
const jwt = require("jsonwebtoken");

exports.getAllSubtodos = async (req, res) => {
  let todos = await Subtodo.findAll({
    where: { todoId: req.body.todoId, archived: false },
  });
  if (!todos) return res.send(404).send({ message: "No todos found." });
  res.status(200).send(todos);
};

exports.newSubtodo = async (req, res) => {
  let todo = await Todo.findOne({
    where: {
      id: req.body.todoId,
    },
  });
  if (!todo) {
    return res.status(404).send({ message: "Todo Not found." });
  }
  let subtodo = await Subtodo.create({
    title: req.body.title,
    todoId: req.body.todoId,
    archived: false,
  });
  if (!subtodo) return res.send(500).send({ message: err });
  res.status(200).send(subtodo);
};

exports.updateSubtodo = async (req, res) => {
  console.log("newTodo.req: ", req);
  let todo = await Todo.findOne({
    where: {
      id: req.body.todoId,
    },
  });
  if (!todo) {
    return res.status(404).send({ message: "User Not found." });
  }
  let subtodo = Subtodo.update(
    {
      title: req.body.title,
    },
    { where: { id: req.body.todoId } }
  );
  if (!subtodo) return res.send(500).send({ message: err });
  res.status(200).send(subtodo);
};

exports.archiveSubtodo = async (req, res) => {
  let todo = await Todo.findOne({
    where: {
      id: req.body.todoId,
    },
  });
  if (!todo) {
    return res.status(404).send({ message: "User Not found." });
  }
  let subtodo = Subtodo.update(
    {
      archived: !req.body.checked,
    },
    { where: { id: req.body.todoId } }
  );
  if (!subtodo) return res.send(500).send({ message: err });
  res.status(200).send(subtodo);
};

exports.checkSubtodo = async (req, res) => {
  let todo = await Todo.findOne({
    where: {
      id: req.body.todoId,
    },
  });
  if (!todo) {
    return res.status(404).send({ message: "User Not found." });
  }
  let subtodo = Subtodo.update(
    {
      checked: !req.body.checked,
    },
    { where: { id: req.body.todoId } }
  );
  if (!subtodo) return res.send(500).send({ message: err });
  res.status(200).send(subtodo);
};
