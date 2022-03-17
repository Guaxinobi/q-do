import { PlusIcon } from "@heroicons/react/solid";
import { useEffect } from "react";

export const Component = ({
  title,
  setTitle,
  handleCreateItem,
  forSubitem,
}) => {
  useEffect(() => {}, [title]);

  return (
    <div className="w-full flex">
      {forSubitem ? (
        <button className="add-subitem-button w-full">
          <PlusIcon
            onClick={(e) => handleCreateItem(e)}
            className="add-icon rotate"
          />
          <form onSubmit={(e) => handleCreateItem(e)}>
            <input
              className="add-item-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        </button>
      ) : (
        <button className="add-button w-full">
          <PlusIcon
            onClick={(e) => handleCreateItem(e)}
            className="add-icon rotate"
          />
          <form onSubmit={(e) => handleCreateItem(e)}>
            <input
              className="add-item-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        </button>
      )}
    </div>
  );
};
