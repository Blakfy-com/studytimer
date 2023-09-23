"use client";
import React from "react";
import TaskCss from "./task.module.scss";
//! Redux Tool Import
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "@/Redux/Slices/taskSlice";

export default function Task({
  text,
  sessionCount,
  activeSession,
  deleteItem,
}) {
  const dispatch = useDispatch();
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
