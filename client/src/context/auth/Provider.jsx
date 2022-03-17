import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "./Context";
import axios from "axios";

export const Provider = ({ children }) => {
  let navigate = useNavigate();

  const [user, setUser] = useState();

  const API_URL = "http://localhost:3001/api/auth/";

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
        refreshToken();
        return;
      })
      .catch((err) => {});
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser();
  };

  const getCurrentUser = () => {
    console.log("getCurrentUser: ", localStorage.getItem("user"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const refreshToken = () => {
    return axios
      .post(API_URL + "refreshToken", { refreshToken: user.refreshToken.token })
      .then((res) => {
        console.log("REFRESH: ", res);
        if (res.data.accessToken) {
          console.log("updateuserresponse ", res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        getCurrentUser();
        return res.data;
      });
  };

  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      return { "x-access-token": user.accessToken };
    } else {
      return {};
    }
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
      .then((res, err) => {
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
      .then((res) => {
        refreshToken();
      })
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
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
