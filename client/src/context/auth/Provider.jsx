import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "./Context";
import axios from "axios";

export const Provider = ({ children }) => {
  let navigate = useNavigate();

  const [user, setUser] = useState();

  const API_URL = "http://localhost:3001/api/auth";

  const signUpUser = (name, email, password) => {
    return axios
      .post(API_URL + "/signup", {
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
      .post(API_URL + "/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        getCurrentUser();
        return res.data;
      })
      .catch((err) => {});
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser();
  };

  const getCurrentUser = () => {
    console.log("getCurrentUser");
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      return { "x-access-token": user.accessToken };
    } else {
      return {};
    }
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
    getCurrentUser: getCurrentUser,
    authHeader: authHeader,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
