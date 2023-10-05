"use client";
import React from "react";
import Task from "./task.module.scss";

export default function AddTask({ onAdd }) {
  // Cerezlere kaydi burada yapilacak.

  return (
    <div className={Task.addTask}>
      <div id="addTask">
        <button onClick={() => onAdd()}>Add Task</button>
      </div>
    </div>
  );
}
