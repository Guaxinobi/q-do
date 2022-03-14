import { useState } from "react/cjs/react.development";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

export const Component = ({
  list,
  setList,
  isTodo,
  updateItem,
  deleteItem,
  currentItem,
  setCurrentItem,
  checkItem,
}) => {
  const [editItemText, setEditItemText] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentText, setCurrentText] = useState("");

  const toggleEditItemText = (e, index, id, title) => {
    e.preventDefault();
    if (editItemText) {
      updateItem(id, currentText).then((res) => {
        setEditItemText(false);
        setCurrentIndex(null);
        setCurrentText("");
      });
    } else {
      setCurrentText(title);
      setEditItemText(true);
      setCurrentIndex(index);
    }
  };

  const handleClickOnItem = (e, item) => {
    console.log("handleclickonitem");
    e.preventDefault();
    if (isTodo) return;
    setCurrentItem(item);
  };

  const handleCheck = (e, id, checked) => {
    e.preventDefault();
    checkItem(id, checked);
  };

  useEffect(() => {}, [currentText, setEditItemText]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteItem(id);
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
    console.log("list: ", list);
    let tempList = list;

    console.log("tempList: ", tempList);
    tempList = reorder(tempList, result.source.index, result.destination.index);

    setList(tempList);
  };

  useEffect(() => {}, [list]);
  useEffect(() => {
    console.log("CURRENTITEM: ", currentItem);
  }, [currentItem]);

  if (!list.length) {
    return <div>No list available</div>;
  } else {
    return (
      <div className=" h-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="uncompleted-list" className="todo-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      index={index}
                      draggableId={`id-${item.id}`}
                    >
                      {(provided) => (
                        <div
                          onClick={(e) => {
                            handleClickOnItem(e, item);
                          }}
                          className={`todo justify-between ${
                            item.id === currentItem?.id && !isTodo
                              ? ` active-item `
                              : ` `
                          }`}
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div>
                            <div className="flex align-center">
                              {isTodo && (
                                <label className="checkbox-container">
                                  <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={(e) => {
                                      handleCheck(e, item.id, item.checked);
                                    }}
                                    id={`item-${index}`}
                                  />
                                  <span
                                    onClick={(e) => {
                                      handleCheck(e, item.id, item.checked);
                                    }}
                                    className="checkmark"
                                  ></span>
                                </label>
                              )}
                              {currentIndex !== index && (
                                <label
                                  htmlFor={`item-${index}`}
                                  className="item-text"
                                >
                                  {item.title}
                                </label>
                              )}
                              <form
                                hidden={index !== currentIndex || !editItemText}
                                onSubmit={(e) => {
                                  toggleEditItemText(
                                    e,
                                    index,
                                    item.id,
                                    item.title
                                  );
                                }}
                              >
                                <input
                                  value={currentText}
                                  onChange={(e) =>
                                    setCurrentText(e.target.value)
                                  }
                                />
                              </form>
                            </div>
                          </div>
                          <div className="flex">
                            <PencilAltIcon
                              onClick={(e) =>
                                toggleEditItemText(
                                  e,
                                  index,
                                  item.id,
                                  item.title
                                )
                              }
                              className="pencil-icon"
                            />
                            <XIcon
                              onClick={(e) => handleDelete(e, item.id)}
                              className="x-icon"
                            />
                          </div>
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
