import React, { useState, useEffect } from "react";
import Task from "./task.module.scss";

export default function AddTask() {
  const [isTask, isSetTask] = useState(true);
  const [count, setCount] = useState(1);
  const [isText, setIsText] = useState("");

  const handleClick = (e) => {
    switch (e.target.value) {
      case "up":
        count < 99 ? setCount(count + 1) : count;
        break;
      case "down":
        count > 0 ? setCount(count - 1) : count;
        break;
    }
  };
  const handleAddTask = (e) => {
    console.log(e.target.id);
    isSetTask(!isTask);
  };

  const handleChange = (e) => {
    setIsText(e.target.value);
  };

  // Cerezlere kaydi burada yapilacak.
  useEffect(() => {
    const savedIsText = localStorage.getItem("isText");
    if (savedIsText) {
      setIsText(savedIsText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isText", isText);
  }, [isText]);

  return (
    <>
      {/* Taskin Text yazisi ~Silinecek~ */}
      <p>{isText}</p>
      {isTask ? (
        // => This pomodoro INPUT
        <div className={Task.addTask} onClick={handleAddTask}>
          <div id="addTask">
            <i className="fa-solid fa-plus"></i>
            <p>Add Task</p>
          </div>
        </div>
      ) : (
        <div className={Task.openTask}>
          {/* This pomodoro INPUT */}

          <div className={Task.text}>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="What are you working on?"
            />
            <p>This Pomodoros</p>
          </div>

          {/* NUMBERS UP AND DOWN */}
          <div className={Task.addValue}>
            <input
              type="number"
              onChange={() => handleChange(e)}
              value={count}
            />
            {/* UP ARROW */}
            <button value="up" onClick={handleClick}>
              <i
                className="fa-solid fa-up-long"
                onClick={(e) => e.target.parentNode.click()}
              />
            </button>
            {/* DOWN ARROW */}
            <button value="down" onClick={handleClick}>
              <i
                className="fa-solid fa-down-long"
                onClick={(e) => e.target.parentNode.click()}
              />
            </button>
          </div>

          {/* DELETE OR SAVE AND CANCEL */}
          <div className={Task.saveOrcancel}>
            <button className={Task.delete} id="delete" onClick={handleAddTask}>
              Delete
            </button>
            <div>
              <button
                className={Task.cancel}
                id="cancel"
                onClick={handleAddTask}>
                Cancel
              </button>
              <button className={Task.save} id="save" onClick={handleAddTask}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
