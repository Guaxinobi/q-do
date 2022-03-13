import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "./Context";
import axios from "axios";
import { useAuth } from "../auth";

export const Provider = ({ children }) => {
  const { authHeader } = useAuth();
  const API_URL = "http://localhost:3001/api/user/";
  const [allLists, setAllLists] = useState([]);

  const getAllLists = () => {
    return axios.get(API_URL + "lists", { headers: authHeader() });
  };

  const createList = () => {
    return axios.post(API_URL + "newlist", { headers: authHeader() });
  };

  const deleteList = () => {
    return axios.post(API_URL + "deletelist", { headers: authHeader() });
  };

  const updateList = () => {
    return axios.post(API_URL + "updateList", { headers: authHeader() });
  };

  const contextValue = {
    getAllLists: getAllLists,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
