import axios from "axios";
import { useEffect, useState } from "react";
import { useList } from "../list";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const API_URL = "http://localhost:3001/api/todo/";
  const { currentList } = useList();
  const [todos, setTodos] = useState([]);

  const getAll = () => {
    console.log("GETALL: ", currentList);
    if (!currentList.id) return;
    return axios
      .post(API_URL + "getall", { listId: currentList.id })
      .then((res) => {
        console.log("TODOS: ", res);
        setTodos([...res.data]);
      })
      .catch((err) => console.log(err));
  };
  const newTodo = (title) => {
    return axios
      .post(API_URL + "newtodo", { listId: currentList.id, title: title })
      .then((res) => {
        console.log("NEW TODO!!!");
        getAll();
      })
      .catch((err) => console.log(err));
  };
  const updateTodo = (todoId, title) => {
    return axios
      .post(API_URL + "updatetodo", {
        listId: currentList.id,
        title: title,
        todoId: todoId,
      })
      .then((res) => {
        getAll();
      })
      .catch((err) => console.log(err));
  };
  const archiveTodo = (todoId) => {
    return axios
      .post(API_URL + "archivetodo", { listId: currentList.id, todoId: todoId })
      .then((res) => {
        getAll();
      })
      .catch((err) => console.log(err));
  };
  const checkTodo = (todoId, checked) => {
    return axios
      .post(API_URL + "checktodo", {
        listId: currentList.id,
        todoId: todoId,
        checked: checked,
      })
      .then((res) => {
        getAll();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("CURRENTLIST: ", currentList);
    if (!currentList) return;
    getAll();
  }, [currentList]);

  useEffect(() => {
    console.log("TODOPROVIDER: ", todos);
  }, [todos]);

  const contextValue = {
    todos: todos,
    setTodos: setTodos,
    getAll: getAll,
    newTodo: newTodo,
    updateTodo: updateTodo,
    archiveTodo: archiveTodo,
    checkTodo: checkTodo,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
