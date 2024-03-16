import React, { useEffect, useState } from "react";
import todo from "./images/todo.svg";

const getItems = () => {
  let data = localStorage.getItem("lists");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
function Todo() {
  const [inputData, setInputData] = useState();
  const [items, setItems] = useState(getItems());
  const [toggleItems, setToggleItems] = useState(true);
  const [editedItem, setEditedItem] = useState(null);

  const editItem = (id2) => {
    let newEditItem = items.find((element) => {
      return element.id === id2;
    });
    setToggleItems(false);
    setInputData(newEditItem.name);
    setEditedItem(id2);
  };

  const addItem = () => {
    if (!inputData) {
      alert("No Input data");
    } else if (inputData && !toggleItems) {
      const afterEdit = items.map((value) => {
        if (value.id === editedItem) {
          return { ...value, name: inputData };
        }
        return value;
      });
      setItems(afterEdit);
      setToggleItems(true);
      setInputData("");
      setEditedItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  const deleteItem = (id1) => {
    const updatedData = items.filter((element) => {
      return id1 !== element.id;
    });
    setItems(updatedData);
  };

  const removeAll = () => {
    setItems([]);
  };
  //to add data to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <h2 className="heading">TODO LIST BY UJJWAL</h2>
          <figure>
            <img src={todo} alt="xyz" />
            <figcaption>Add Your Items Here </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Enter Your List Item"
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            {toggleItems ? (
              <i class="fa fa-solid fa-plus" title="Add" onClick={addItem}></i>
            ) : (
              <i class="far fa-edit add-btn" title="edit" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="todo-btn">
                    <i
                      class="far fa-trash-alt add-btn"
                      title="Delete"
                      onClick={() => {
                        deleteItem(element.id);
                      }}
                    ></i>
                    <i
                      class="far fa-edit add-btn"
                      title="edit"
                      onClick={() => {
                        editItem(element.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CheckList</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
