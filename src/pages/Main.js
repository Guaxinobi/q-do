import { ListComponent } from "../components";
import { useTodo } from "../context/todo";
import ReactLoading from "react-loading";
export const Page = () => {
  const { currentList } = useTodo();

  console.log("currentList: ", currentList);
  if (!currentList) {
    return (
      <div>
        LOADING
        <ReactLoading type="spinningBubbles" color="#00ff00" />
      </div>
    );
  } else {
    return (
      <div className="main-page">
        <div>
          <ListComponent items={currentList.todos} />
        </div>
      </div>
    );
  }
};
