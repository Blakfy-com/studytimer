"use client";
import React from "react";
import TaskCss from "./task.module.scss";

export default function Task({
  text,
  sessionCount,
  activeSession,
  deleteItem,
}) {
  return (
    <div className={TaskCss.tasks}>
      <div className={TaskCss.tasksText}>
        <i className="fa-solid fa-check" />
        <p>{text}</p>
      </div>
      <div className={TaskCss.task}>
        <p>
          {activeSession} / {sessionCount}
        </p>
        <button onClick={() => deleteItem()}>
          <i className="fa-solid fa-x" />
        </button>
      </div>
    </div>
  );
}
