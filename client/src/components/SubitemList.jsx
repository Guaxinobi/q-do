import { useState } from "react";
import { List, NewItem } from ".";
import { useSubtodo } from "../context/subtodo";

export const Component = () => {
  const {
    subtodos,
    setSubtodos,
    newSubtodo,
    updateSubtodo,
    archiveSubtodo,
    checkSubtodo,
  } = useSubtodo();
  const [title, setTitle] = useState("new subtodo");

  const handleCreateSubtodo = (e) => {
    console.log("2");
    e.preventDefault();
    newSubtodo(title);
  };

  useState(() => {}, [title]);

  return (
    <div>
      <NewItem
        title={title}
        setTitle={setTitle}
        handleCreateItem={handleCreateSubtodo}
        forSubitem={true}
      />
      <List
        list={subtodos}
        setList={setSubtodos}
        isItem={true}
        isSubitem={true}
        updateItem={updateSubtodo}
        deleteItem={archiveSubtodo}
        checkItem={checkSubtodo}
        checkable={true}
      />
    </div>
  );
};
