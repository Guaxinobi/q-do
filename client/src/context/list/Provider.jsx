import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const API_URL = "http://localhost:3001/api/list/";
  const { user } = useAuth();
  const [currentList, setCurrentList] = useState({});
  const [lists, setLists] = useState({});

  const getLists = () => {
    return axios
      .post(API_URL + "getall", { userId: user.id })
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => console.log(err));
  };

  const newList = (title) => {
    return axios
      .post(API_URL + "new", { userId: user.id, title: title })
      .then((res) => {
        getLists();
      })
      .catch((err) => console.log(err));
  };

  const updateList = (listId, title) => {
    return axios
      .post(API_URL + "update", {
        userId: user.id,
        listId: listId,
        title: title,
      })
      .then((res) => getLists())
      .catch((err) => console.log(err));
  };

  const deleteList = (listId) => {
    return axios
      .post(API_URL + "archive", { userId: user.id, listId: listId })
      .then((res) => getLists())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!user) return;
    getLists();
  }, [user]);

  useEffect(() => {
    console.log("LISTS: ", lists);
    if (!lists.length) return;
    setCurrentList([lists[0]]);
  }, [user, lists]);

  useEffect(() => {}, [currentList]);

  const contextValue = {
    currentList: currentList,
    setCurrentList: setCurrentList,
    lists: lists,
    setLists: setLists,
    newList: newList,
    deleteList: deleteList,
    updateList: updateList,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
