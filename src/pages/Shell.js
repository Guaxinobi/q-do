import { todos } from "../MockData.js";
import { PlusIcon } from "@heroicons/react/solid";
import { ListComponent } from "../components/index.js";

export const Page = () => {
  return (
    <div className="main-page">
      <div className="todo new-todo">
        <PlusIcon className="plus-icon" />
        Neue Aufgabe erstellen
      </div>
      <ListComponent items={todos} />
    </div>
  );
};
