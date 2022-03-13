import { useEffect, useState } from "react";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const contextValue = {
    todos: todos,
    setTodos: setTodos,
  };

  useEffect(() => {}, [todos]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
