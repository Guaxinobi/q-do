const db = require("../models");
const { list: List, todo: Todo } = db;
const jwt = require("jsonwebtoken");

exports.getAllTodos = async (req, res) => {
  let todos = await Todo.findAll({
    where: { listId: req.body.listId, archived: false },
  });
  if (!todos) return res.send(404).send({ message: "No todos found." });
  res.status(200).send(todos);
};

exports.newTodo = async (req, res) => {
  let list = await List.findOne({
    where: {
      id: req.body.listId,
    },
  });
  if (!list) {
    return res.status(404).send({ message: "List Not found." });
  }
  let todo = await Todo.create({
    title: req.body.title,
    listId: req.body.listId,
    archived: false,
  });
  if (!todo) return res.send(500).send({ message: err });
  res.status(200).send(todo);
};

exports.updateTodo = async (req, res) => {
  console.log("newTodo.req: ", req);
  let list = await List.findOne({
    where: {
      id: req.body.listId,
    },
  });
  if (!list) {
    return res.status(404).send({ message: "User Not found." });
  }
  let todo = Todo.update(
    {
      title: req.body.title,
    },
    { where: { id: req.body.todoId } }
  );
  if (!todo) return res.send(500).send({ message: err });
  res.status(200).send(todo);
};

exports.archiveTodo = async (req, res) => {
  let list = await List.findOne({
    where: {
      id: req.body.listId,
    },
  });
  if (!list) {
    return res.status(404).send({ message: "User Not found." });
  }
  let todo = Todo.update(
    {
      archived: !req.body.checked,
    },
    { where: { id: req.body.todoId } }
  );
  if (!todo) return res.send(500).send({ message: err });
  res.status(200).send(todo);
};

exports.checkTodo = async (req, res) => {
  let list = await List.findOne({
    where: {
      id: req.body.listId,
    },
  });
  if (!list) {
    return res.status(404).send({ message: "User Not found." });
  }
  let todo = Todo.update(
    {
      checked: true,
    },
    { where: { id: req.body.todoId } }
  );
  if (!todo) return res.send(500).send({ message: err });
  res.status(200).send(todo);
};
