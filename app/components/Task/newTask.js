import React, { useState } from "react";
import Task from "./task.module.scss";

//! Redux Tool Import
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "@/Redux/Slices/taskSlice";

export default function NewTask({ cancelTask, saveTask }) {
  //! useSelector and useDispatch
  const dispatch = useDispatch();
  //! useState`s
  const [count, setCount] = useState(1);
  const [isText, setIsText] = useState("");

  const handleArrow = (e) => {
    switch (e.target.value) {
      case "up":
        count < 99 ? setCount(count + 1) : count;
        break;
      case "down":
        count > 0 ? setCount(count - 1) : count;
        break;
    }
  };

  const addSave = () => {
    let todo = {
      key: Date.now(),
      text: isText,
      currentSession: 1,
      totalSessions: count,
    };
    dispatch(addTodo(todo));
    console.log(todo);
  };

  const handleChange = (e) => {
    setIsText(e.target.value);
  };

  return (
    <div className={Task.newTask}>
      {/* This pomodoro INPUT */}

      <div className={Task.inputValue}>
        <input
          id="newItemText"
          value={isText}
          onChange={handleChange}
          type="text"
          placeholder="What are you working on?"
        />
      </div>

      {/* NUMBERS UP AND DOWN */}
      <div className={Task.setNumber}>
        <div className={Task.title}>
          <p>Est Pomodoros</p>
        </div>

        <div className={Task.values}>
          <div>{count}</div>

          {/* UP ARROW */}
          <button value="up" onClick={handleArrow}>
            <i
              className="fa-solid fa-up-long"
              onClick={(e) => e.target.parentNode.click()}
            />
          </button>

          {/*  DOWN ARROW */}
          <button value="down" onClick={handleArrow}>
            <i
              className="fa-solid fa-down-long"
              onClick={(e) => e.target.parentNode.click()}
            />
          </button>
        </div>
      </div>

      {/* DELETE OR SAVE AND CANCEL */}
      <div className={Task.saveOrcancel}>
        <button className={Task.delete} id="delete">
          Delete
        </button>
        <div>
          <button
            className={Task.cancel}
            id="cancel"
            onClick={() => cancelTask()}>
            Cancel
          </button>
          <button className={Task.save} id="save" onClick={addSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
