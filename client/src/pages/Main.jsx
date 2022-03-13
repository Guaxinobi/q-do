import { List } from "../components";
import { useTodo } from "../context/todo";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { NewItem } from "../components";
import { useList } from "../context/list";
export const Page = () => {
  const { todos, setTodos, newTodo, updateTodo, archiveTodo, checkTodo } =
    useTodo();
  const { user } = useAuth();
  const { currentList } = useList();
  const [title, setTitle] = useState("new todo");

  const handleCreateTodo = (e) => {
    e.preventDefault();
    newTodo(title);
  };

  useEffect(() => {
    console.log("MAIN:USER: ", user);
    console.log("MAIN:TODOS: ", todos);
    console.log("MAIN:CURRENTLIST: ", currentList);
  }, [user, todos, currentList]);

  const conditionalContents = () => {
    if (!user) {
      return (
        <div className="flex justify-center align-center">
          <div>LOADING</div>
          <div>
            <ReactLoading type="spinningBubbles" color="#00ff00" />
          </div>
        </div>
      );
    } else if (!currentList) {
      return (
        <div className="flex-col justify-center align-center">
          <div className="flex justify-center">
            LOADING
            <ReactLoading type="spinningBubbles" color="#00ff00" />
          </div>
          Choose a List
        </div>
      );
    } else if (!todos.length) {
      return (
        <div className="flex-col justify-center align-center">
          <div>LOADING</div>
          <div>
            <ReactLoading type="spinningBubbles" color="#00ff00" />
          </div>
          <div>This List is empty. Create a Todo!</div>
        </div>
      );
    } else if (todos.length > 0) {
      return (
        <div className="flex-col overflow-y-scroll">
          <List list={todos} setList={setTodos} isTodo={true} />
        </div>
      );
    }
  };

  return (
    <div className="main-page overflow-hidden">
      {currentList && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <NewItem
            title={title}
            setTitle={setTitle}
            handleCreateItem={handleCreateTodo}
          />
        </div>
      )}
      {conditionalContents()}
    </div>
  );
};
