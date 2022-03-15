import { ChevronLeftIcon, LogoutIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useList } from "../context/list";
import { List, NewItem, Profile } from "../components";

export const Layout = ({ children }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [title, setTitle] = useState("new list");
  const { logout, user } = useAuth();
  const {
    lists,
    setLists,
    newList,
    updateList,
    deleteList,
    setCurrentList,
    currentList,
  } = useList();
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

  useEffect(() => {}, [title, currentList, lists]);

  return (
    <div className="shell overflow-hidden">
      <div
        className={
          `side-nav overflow-hidden relative flex-col` +
          (showSideBar ? `  ` : ` closed `)
        }
      >
        <div className="w-full overflow-hidden flex flex-col relative">
          <div className={`side-nav-head w-full relative`}>
            <div className="logo">Q-DO</div>
            <div
              className="user-icon"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <UserIcon className="icon" />
            </div>
            <span className="greeting">Hello, {user.username}</span>
            {openProfile && (
              <div className="profile show ">
                <Profile />
              </div>
            )}
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
              setCurrentItem={setCurrentList}
              currentItem={currentList}
            />
          </div>
        </div>
        <div className="flex  flex-col w-full relative">
          <button onClick={(e) => handleLogout(e)} className="logout-button">
            <LogoutIcon className="logout-icon" />
            <div>Logout</div>
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
