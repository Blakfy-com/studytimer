import React, { useState } from "react";
import Task from "./task.module.scss";

//! Redux Tool Import
import { useSelector, useDispatch } from "react-redux";
import { addData } from "@/Redux/Slices/taskSlice";
import Image from "next/image";

export default function NewTask({ cancelTask, savesTask }) {
  //! useSelector and useDispatch
  const dispatch = useDispatch();
  //! useState`s
  const [count, setCount] = useState(1);
  const [isText, setIsText] = useState("");

  const handleArrow = (e) => {
    switch (e.target.name) {
      case "up":
        count < 99 ? setCount(count + 1) : count;
        break;
      case "down":
        count > 0 ? setCount(count - 1) : count;
        break;
    }
  };

  const saveTask = () => {
    let todo = {
      key: Date.now(),
      text: isText,
      currentSession: 1,
      totalSessions: count,
    };

    if (todo.text.length >= 1) {
      dispatch(addData(todo));
      savesTask();
    }
  };

  const handleChange = (e) => {
    setIsText(e.target.value);
  };

  return (
    <div className={Task.newTask}>
      {/* This pomodoro INPUT */}

      <div className={Task.inputValue}>
        {/* 35 karaktere kadar sınırlandırılacaktır. */}
        <input
          className={Task.newItemText}
          id="newItemText"
          value={isText}
          onChange={handleChange}
          type="text"
          maxLength={30}
          placeholder="What are you working on ?"
        />
      </div>

      {/* NUMBERS UP AND DOWN */}
      <div className={Task.setNumber}>
        <div className={Task.title}>
          <p>Est Pomodoros</p>
        </div>

        <div className={Task.values}>
          <div className={Task.number}>{count}</div>
          {/* UP ARROW */}
          <button name="up" onClick={handleArrow}>
            <Image
              src="/up-arrow.png"
              width={20}
              height={20}
              alt="uparrow"
              name="up"
              onClick={handleArrow}
            />
          </button>

          {/*  DOWN ARROW */}
          <button name="down" onClick={handleArrow}>
            <Image
              src="/down-arrow.png"
              width={20}
              height={20}
              alt="downarrow"
              name="down"
              onClick={handleArrow}
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
          <button className={Task.save} id="save" onClick={saveTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
