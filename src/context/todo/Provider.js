import { useEffect, useState } from "react";
import { TODO_LISTS } from "../../MockData";
import { Context } from "../todo/Context";

export const Provider = ({ children }) => {
  const [lists, setLists] = useState(TODO_LISTS);
  const [currentList, setCurrentList] = useState(TODO_LISTS[0]);
  const contextValue = {
    lists: lists,
    setLists: setLists,
    currentList: currentList,
    setCurrentList: setCurrentList,
  };

  useEffect(() => {}, [lists, currentList]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
