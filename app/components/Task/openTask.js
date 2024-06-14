"use client";
import React, { useState } from "react";
import Task from "./task.module.scss";

export default function OpenTask(props) {
  const [count, setCount] = useState(1);

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
  return (
    <div className={Task.openTask}>
      {/* This pomodoro INPUT */}

      <div className={Task.text}>
        <input placeholder="What are you working on?" />
        <p>This Pomodoros</p>
      </div>

      {/* NUMBERS UP AND DOWN */}
      <div className={Task.addValue}>
        <input type="number" onChange={() => handleChange(e)} value={count} />
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
        <button className={Task.delete}>{props.delete}</button>
        <div>
          <button className={Task.cancel}>{props.cancel}</button>
          <button className={Task.save}>{props.save}</button>
        </div>
      </div>
    </div>
  );
}
