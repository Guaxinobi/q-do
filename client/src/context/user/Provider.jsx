import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "./Context";
import axios from "axios";
import { useAuth } from "../auth";

export const Provider = ({ children }) => {
  const { authHeader, user, refreshToken } = useAuth();
  const API_URL = "http://localhost:3001/api/auth/";

  const updateUser = (username, email) => {
    return axios
      .post(
        API_URL + "update",
        {
          userId: user.id,
          username: username,
        },
        { headers: authHeader() }
      )
      .then((res, err) => {
        refreshToken();
      })
      .catch((err) => {});
  };

  const changePassword = (oldPassword, newPassword) => {
    return axios
      .post(
        API_URL + "changepassword",
        {
          userId: user.id,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        refreshToken();
      })
      .catch((err) => console.log(err));
  };

  const contextValue = {
    updateUser: updateUser,
    changePassword: changePassword,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
