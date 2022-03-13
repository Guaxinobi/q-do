import { useEffect, useState } from "react";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const [currentList, setCurrentList] = useState([]);

  const contextValue = {
    currentList: currentList,
    setCurrentList: setCurrentList,
  };

  useEffect(() => {}, [todos]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
