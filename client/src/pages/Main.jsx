import { ListComponent } from "../components";
import { useTodo } from "../context/todo";
import ReactLoading from "react-loading";
import { PlusIcon } from "@heroicons/react/solid";
import { useUser } from "../context/user";
import { useEffect } from "react";

export const Page = () => {
  const { user } = useUser();
  useEffect(() => {
    console.log("MAIN: ", user);
  }, [user]);

  if (!user) {
    return (
      <div>
        LOADING
        <ReactLoading type="spinningBubbles" color="#00ff00" />
      </div>
    );
  } else {
    return (
      <div className="main-page">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button className="add-todo">
            <PlusIcon className="add-icon" />{" "}
            <span hidden>Create new todo</span>
            <form>
              <input className="add-todo-input" />
            </form>
          </button>

          {/*<ListComponent items={currentList.todos} />*/}
        </div>
      </div>
    );
  }
};
