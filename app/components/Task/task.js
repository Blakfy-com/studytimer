"use client";
import React from "react";
import TaskCss from "./task.module.scss";
import TrashSVG from "../icons/trash/trash";
import VerifySVG from "../icons/verify/verify";

export default function Task({
  text,
  sessionCount,
  activeSession,
  deleteItem,
  taskId,
  editTaskClick,
}) {
  return (
    <div
      onClick={() => editTaskClick(taskId)}
      id={taskId}
      className={TaskCss.tasks}
    >
      <div className={TaskCss.tasksText}>
        <VerifySVG />
        <p>{text}</p>
      </div>
      <div className={TaskCss.task}>
        <p>
          {activeSession} / {sessionCount}
        </p>
        <button onClick={() => deleteItem()}>
          <TrashSVG />
        </button>
      </div>
    </div>
  );
}
