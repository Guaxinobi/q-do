import { ChevronLeftIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

export const Page = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const { logout, user } = useAuth();
  let navigate = useNavigate();
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    console.log("user: ", user);
    if (!user) {
      navigate("/");
      return;
    }
  }, [showSideBar, user]);

  return (
    <div className="shell">
      <div className={`side-nav` + (showSideBar ? `  ` : ` closed `)}>
        <div className={`side-nav-head`}>
          <div className="logo">Q-DO</div>
          <div className="user-icon">
            <UserIcon className="icon" />
          </div>
        </div>
        <div className="sive-nav-bottom">
          <button onClick={(e) => handleLogout(e)}>Logout</button>
        </div>
      </div>
      <div className="wrapper">
        <button onClick={() => toggleSideBar()} className="toggle-sidebar">
          <ChevronLeftIcon
            className={
              `open-sidebar` +
              (showSideBar ? ` rotate-left ` : ` rotate-right `)
            }
          />
        </button>
        <Outlet />
      </div>
    </div>
  );
};
