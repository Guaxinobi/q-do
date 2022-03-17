import { useState } from "react/cjs/react.development";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import { XIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export const Component = ({
  list,
  setList,
  hasSubitem,
  isSubitem,
  updateItem,
  deleteItem,
  currentItem,
  setCurrentItem,
  checkItem,
  children,
  checkable,
}) => {
  const [editItemText, setEditItemText] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [currentText, setCurrentText] = useState("");
  const [showSubs, setShowSubs] = useState(false);
  const [showSubsIndex, setShowSubsIndex] = useState(-1);

  const toggleEditItemText = (e, index, id, title) => {
    e.preventDefault();
    if (editItemText) {
      updateItem(id, currentText).then((res) => {
        setEditItemText(false);
        setEditIndex(null);
        setCurrentText("");
      });
    } else {
      setCurrentText(title);
      setEditItemText(true);
      setEditIndex(index);
    }
  };

  const toggleShowSubitems = (id) => {
    setShowSubs(!showSubs);
    setShowSubsIndex(id);
  };

  useEffect(() => {
    if (showSubs) return;
    setShowSubsIndex(-1);
  }, [showSubs]);

  const handleClickOnItem = (e, item) => {
    e.preventDefault();
    if (isSubitem) return;
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

  if (!list?.length) {
    return <div> </div>;
  } else {
    return (
      <div className=" h-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="uncompleted-list" className="list">
            {(provided) => (
              <div>
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {list.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        index={index}
                        draggableId={`id-${item.id}`}
                      >
                        {(provided) => (
                          <div>
                            <div>
                              {" "}
                              <div
                                onClick={(e) => {
                                  handleClickOnItem(e, item);
                                }}
                                className={` justify-between ${
                                  item?.checked ? ` checked ` : ` item `
                                } ${
                                  item.id === currentItem?.id && !hasSubitem
                                    ? ` active-item `
                                    : ` `
                                } ${isSubitem ? ` subitem ` : ` `}`}
                                key={index}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div>
                                  <div className="flex align-center">
                                    {checkable && (
                                      <label className="checkbox-container">
                                        <input
                                          type="checkbox"
                                          checked={item.checked}
                                          onChange={(e) => {
                                            handleCheck(
                                              e,
                                              item.id,
                                              item.checked
                                            );
                                          }}
                                          id={`item-${index}`}
                                        />
                                        <span
                                          onClick={(e) => {
                                            handleCheck(
                                              e,
                                              item.id,
                                              item.checked
                                            );
                                          }}
                                          className="checkmark"
                                        ></span>
                                      </label>
                                    )}
                                    {hasSubitem &&
                                      (showSubs && showSubsIndex === item.id ? (
                                        <ChevronUpIcon
                                          onClick={(e) => {
                                            handleClickOnItem(e, item);
                                            toggleShowSubitems(item.id);
                                          }}
                                          className="chevron"
                                        />
                                      ) : (
                                        <ChevronDownIcon
                                          onClick={(e) => {
                                            handleClickOnItem(e, item);
                                            toggleShowSubitems(item.id);
                                          }}
                                          className="chevron"
                                        />
                                      ))}

                                    {editIndex !== index && (
                                      <label
                                        htmlFor={`item-${index}`}
                                        className="item-text"
                                      >
                                        {item.title}
                                      </label>
                                    )}
                                    <form
                                      hidden={
                                        index !== editIndex || !editItemText
                                      }
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
                            </div>
                            <div>
                              {hasSubitem &&
                                showSubs &&
                                showSubsIndex === item.id && (
                                  <div>{children}</div>
                                )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
};
