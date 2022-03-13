import { List } from "../components";
import { useTodo } from "../context/todo";
import ReactLoading from "react-loading";
import { PlusIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useAuth } from "../context/auth";

export const Page = () => {
  const { todos, setTodos } = useTodo();
  const { user } = useAuth();
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
          <button className="add-button">
            <PlusIcon className="add-icon rotate" />{" "}
            <span hidden>Create new todo</span>
            <form>
              <input className="add-item-input" />
            </form>
          </button>

          <div>
            <List list={todos} setList={setTodos} todo={true} />
          </div>
        </div>
      </div>
    );
  }
};
