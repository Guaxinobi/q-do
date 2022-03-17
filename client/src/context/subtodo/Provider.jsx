import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { useTodo } from "../todo";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const API_URL = "http://localhost:3001/api/subtodo/";
  const { currentTodo } = useTodo();
  const { authHeader, refreshToken } = useAuth();
  const [subtodos, setSubtodos] = useState([]);

  const getAll = () => {
    if (!currentTodo.id) return;
    return axios
      .post(
        API_URL + "getall",
        { todoId: currentTodo.id },
        { headers: authHeader() }
      )
      .then((res) => {
        console.log("TODOS: ", res);
        setSubtodos([...res.data]);
      })
      .catch((err) => {
        if (err.status === 401) refreshToken();
      });
  };
  const newSubtodo = (title) => {
    return axios
      .post(
        API_URL + "newsubtodo",
        {
          todoId: currentTodo.id,
          title: title,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        console.log("NEW SUBTODOTODO!!!");
        getAll();
      })
      .catch((err) => {
        if (err.status === 401) refreshToken();
      });
  };
  const updateSubtodo = (todoId, title) => {
    return axios
      .post(
        API_URL + "updatesubtodo",
        {
          todoId: currentTodo.id,
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
  const archiveSubtodo = (todoId) => {
    return axios
      .post(
        API_URL + "archivesubtodo",
        {
          todoId: currentTodo.id,
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
  const checkSubtodo = (todoId, checked) => {
    return axios
      .post(
        API_URL + "checksubtodo",
        {
          todoId: currentTodo.id,
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
    console.log("currentTodo: ", currentTodo);
    if (!currentTodo) return;
    getAll();
  }, [currentTodo]);

  useEffect(() => {
    console.log("TODOPROVIDER: ", subtodos);
  }, [subtodos]);

  const contextValue = {
    subtodos: subtodos,
    setSubtodos: setSubtodos,
    getAll: getAll,
    newSubtodo: newSubtodo,
    updateSubtodo: updateSubtodo,
    archiveSubtodo: archiveSubtodo,
    checkSubtodo: checkSubtodo,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
