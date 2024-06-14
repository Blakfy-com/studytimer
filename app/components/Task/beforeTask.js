import React from "react";
import Task from "./task.module.scss";

export default function BeforeTask(props) {
  return (
    <div className={Task.tasks}>
      <div className={Task.headerOrTask}>
        <div className={Task.tasksHeader}>
          <i className="fa-solid fa-check"></i>
          <p>{props.name}</p>
        </div>
        <div className={Task.task}>
          <p>{props.pomoNumber}</p>
          <button>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
