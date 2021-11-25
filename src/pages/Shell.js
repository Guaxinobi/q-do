import { ChevronLeftIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { useState } from "react/cjs/react.development";
import { TODO_LISTS } from "../MockData.js";

export const Page = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [currentList, setCurrentList] = useState({});

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {}, [showSideBar]);

  return (
    <div className="shell">
      <div className={`side-nav` + (showSideBar ? `  ` : ` closed `)}>
        <div className="logo">Q-DO</div>
        <div className="user-icon">
          <UserIcon className="icon" />
        </div>
        <div className="lists">
          {TODO_LISTS.map((item, index) => {
            <div
              onClick={() => setCurrentList(TODO_LISTS[index])}
              key={index}
              className="list-item"
            >
              {item.name}
            </div>;
          })}
        </div>
      </div>
      <div className="wrapper">
        <button onClick={() => toggleSideBar()} className="toggle-sidebar">
          <ChevronLeftIcon
            className={`open-sidebar` + (showSideBar ? ` ` : ` rotate `)}
          />
        </button>
        <Outlet />
      </div>
    </div>
  );
};
