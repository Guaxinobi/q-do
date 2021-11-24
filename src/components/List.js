import e from "cors";
import { useState } from "react/cjs/react.development";

export const Component = ({ items }) => {
  const [editTodoText, setEditTodoText] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);

  const toggleEditTodoText = (txt, index) => {
    setEditTodoText(!editTodoText);
    setCurrentIndex(index);
    setTodoText(txt);
  };
  return (
    <div className="todo-list">
      {items.map((todo, index) => {
        return (
          <div key={index} className="todo">
            <div className="checkbox">
              <input type="checkbox" />
            </div>
            <span
              hidden={editTodoText && index === currentIndex}
              onClick={() => toggleEditTodoText(todo.text, index)}
              className="todo-text"
            >
              {todo.text}
            </span>
            <input
              hidden={index !== currentIndex || !editTodoText}
              value={todo.text}
            />
          </div>
        );
      })}
    </div>
  );
};
