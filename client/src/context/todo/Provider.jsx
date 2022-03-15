import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { useList } from "../list";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const API_URL = "http://localhost:3001/api/todo/";
  const { currentList } = useList();
  const { authHeader } = useAuth();
  const [todos, setTodos] = useState([]);

  const getAll = () => {
    if (!currentList.id) return;
    return axios
      .post(
        API_URL + "getall",
        { listId: currentList.id },
        { headers: authHeader() }
      )
      .then((res) => {
        console.log("TODOS: ", res);
        setTodos([...res.data]);
      })
      .catch((err) => console.log(err));
  };
  const newTodo = (title) => {
    return axios
      .post(
        API_URL + "newtodo",
        {
          listId: currentList.id,
          title: title,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        console.log("NEW TODO!!!");
        getAll();
      })
      .catch((err) => console.log(err));
  };
  const updateTodo = (todoId, title) => {
    return axios
      .post(
        API_URL + "updatetodo",
        {
          listId: currentList.id,
          title: title,
          todoId: todoId,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        getAll();
      })
      .catch((err) => console.log(err));
  };
  const archiveTodo = (todoId) => {
    return axios
      .post(
        API_URL + "archivetodo",
        {
          listId: currentList.id,
          todoId: todoId,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        getAll();
      })
      .catch((err) => console.log(err));
  };
  const checkTodo = (todoId, checked) => {
    return axios
      .post(
        API_URL + "checktodo",
        {
          listId: currentList.id,
          todoId: todoId,
          checked: checked,
        },
        { headers: authHeader() }
      )
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
