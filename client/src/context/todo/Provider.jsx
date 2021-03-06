import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { useList } from "../list";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const API_URL = "http://localhost:3001/api/todo/";
  const { currentList } = useList();
  const { authHeader, refreshToken } = useAuth();
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({});

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
      .catch((err) => {
        if (err.status === 401) refreshToken();
      });
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
      .catch((err) => {
        if (err.status === 401) refreshToken();
      });
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
      .catch((err) => {
        if (err.status === 401) refreshToken();
      });
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
      .catch((err) => {
        if (err.status === 401) refreshToken();
      });
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
      .catch((err) => {
        if (err.status === 401) refreshToken();
      });
  };

  useEffect(() => {
    if (!currentList) return;
    getAll();
  }, [currentList]);

  useEffect(() => {}, [todos]);

  useEffect(() => {
    if (!currentTodo) return;
  }, [currentTodo]);

  const contextValue = {
    todos: todos,
    setTodos: setTodos,
    getAll: getAll,
    newTodo: newTodo,
    updateTodo: updateTodo,
    archiveTodo: archiveTodo,
    checkTodo: checkTodo,
    currentTodo: currentTodo,
    setCurrentTodo: setCurrentTodo,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
