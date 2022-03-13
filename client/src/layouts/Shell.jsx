import { ChevronLeftIcon, LogoutIcon } from "@heroicons/react/outline";
import { PlusIcon, UserIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useList } from "../context/list";
import { List, NewItem } from "../components";

export const Layout = ({ children }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [title, setTitle] = useState("new list");
  const { logout, user } = useAuth();
  const { lists, setLists, newList, updateList, deleteList } = useList();
  let navigate = useNavigate();
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const handleCreateList = (e) => {
    e.preventDefault();
    newList(title);
  };

  useEffect(() => {
    console.log("user: ", user);
    if (!user) {
      navigate("/");
      return;
    }
  }, [showSideBar, user]);

  useEffect(() => {}, [title]);

  return (
    <div className="shell overflow-hidden">
      <div
        className={
          `side-nav overflow-hidden relative` +
          (showSideBar ? `  ` : ` closed `)
        }
      >
        <div className="w-full overflow-hidden flex flex-col">
          <div className={`side-nav-head`}>
            <div className="logo">Q-DO</div>
            <div className="user-icon">
              <UserIcon className="icon" />
            </div>
            <span>Hello, {user.username}</span>
          </div>

          <NewItem
            title={title}
            setTitle={setTitle}
            handleCreateItem={handleCreateList}
          />
          <div className="overflow-y-scroll relative">
            <List
              list={lists}
              setList={setLists}
              updateItem={updateList}
              deleteItem={deleteList}
              className=""
            />
          </div>
        </div>
        <div className="sive-nav-bottom">
          <button onClick={(e) => handleLogout(e)} className="logout-button">
            <LogoutIcon className="logout-icon" />
            Logout
          </button>
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
        {children}
      </div>
    </div>
  );
};
