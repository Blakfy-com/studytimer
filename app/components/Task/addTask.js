"use client";
import React, { useState, useEffect } from "react";
import Task from "./task.module.scss";

export default function AddTask({ onAdd }) {
  // Cerezlere kaydi burada yapilacak.

  return (
    <div className={Task.addTask} onClick={() => onAdd()}>
      <div id="addTask">
        <i className="fa-solid fa-plus"></i>
        <p>Add Task</p>
      </div>
    </div>
  );
}
