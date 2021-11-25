import { useState } from "react/cjs/react.development";
import { useTodo } from "../context/todo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactLoading from "react-loading";

export const Component = () => {
  const [editTodoText, setEditTodoText] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const { currentList, setCurrentList } = useTodo();
  const toggleEditTodoText = (txt, index) => {
    setEditTodoText(!editTodoText);
    setCurrentIndex(index);
    setTodoText(txt);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    console.log("currentList: ", currentList);
    let tempList = currentList;

    console.log("tempList: ", tempList);
    tempList.todos = reorder(
      tempList.todos,
      result.source.index,
      result.destination.index
    );

    setCurrentList(tempList);
  };

  if (!currentList) {
    return (
      <div>
        LOADING
        <ReactLoading type="spinningBubbles" color="#00ff00" />
      </div>
    );
  } else {
    return (
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="uncompleted-list" className="todo-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {currentList.todos.map((todo, index) => {
                  console.log("item ", index, ": ", todo);
                  return (
                    <Draggable
                      key={index}
                      index={index}
                      draggableId={index.toString()}
                    >
                      {(provided) => (
                        <div
                          className="todo"
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
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
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
};
