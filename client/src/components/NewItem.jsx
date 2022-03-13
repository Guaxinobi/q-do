import { PlusIcon } from "@heroicons/react/solid";
import { useEffect } from "react";

export const Component = ({ title, setTitle, handleCreateItem }) => {
  useEffect(() => {}, [title]);

  return (
    <div className="w-full flex">
      <button className="add-button w-full">
        <PlusIcon
          onClick={(e) => handleCreateItem(e)}
          className="add-icon rotate"
        />{" "}
        <span hidden>Create new todo</span>
        <form onSubmit={(e) => handleCreateItem(e)}>
          <input
            className="add-item-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </button>
    </div>
  );
};
