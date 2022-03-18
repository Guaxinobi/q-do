import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "./Context";
import axios from "axios";

export const Provider = ({ children }) => {
  let navigate = useNavigate();

  const [user, setUser] = useState();

  const API_URL = "http://localhost:3001/api/auth/";

  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      console.log("SET TOKEN");
      return { "x-access-token": user.accessToken };
    } else {
      return {};
    }
  };

  const signUpUser = (name, email, password) => {
    return axios
      .post(API_URL + "signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        return navigate("/", true);
      })
      .catch((err) => {});
  };

  const signInUser = (email, password) => {
    return axios
      .post(API_URL + "signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        getCurrentUser();

        return;
      })
      .catch((err) => {});
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser();
  };

  const getCurrentUser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const refreshToken = () => {
    console.log("USERREFRESHTOKEN: ", user);
    return axios
      .post(
        API_URL + "refreshToken",
        { refreshToken: user.refreshToken.token },
        { headers: authHeader() }
      )
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        getCurrentUser();
        return res.data;
      });
  };

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
      .then((res) => {
        refreshToken();
      })
      .catch((err) => {
        if (err.status === 401) refreshToken();
      });
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
      .then((res) => {})
      .catch((err) => {
        if (err.status === 401) refreshToken();
      });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log("AUTH: ", user);
    if (!user) return navigate("/");

    navigate("/home");
  }, [user]);

  const contextValue = {
    signUpUser: signUpUser,
    signInUser: signInUser,
    logout: logout,
    user: user,
    authHeader: authHeader,
    refreshToken: refreshToken,
    updateUser: updateUser,
    changePassword: changePassword,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
