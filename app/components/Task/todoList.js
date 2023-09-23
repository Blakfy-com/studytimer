"use client";
import React, { useState, useEffect } from "react";
import NewTask from "./newTask";
import Task from "./task";
import AddTask from "./addTask";

//! Redux Tool Import
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "@/Redux/Slices/taskSlice";

export default function TodoList() {
  //! useSelector and useDispatch
  const { todoLists } = useSelector((state) => state.pomodoroTodoList);
  const dispatch = useDispatch();

  //! useState`s
  const [isView, setIsView] = useState(false);

  const openNewTask = () => {
    setIsView(!isView);
  };

  return (
    <>
      <div>
        {todoLists.map((todo) => (
          //** Burada Tasklarin icerikleri Redux uzerinden cekiliyor. */
          <Task
            key={todo.key}
            text={todo.text}
            sessionCount={todo.totalSessions}
            activeSession={todo.currentSession}
            //** deleteItem fonksiyonu redux uzerinden bagli oldugu key bakilarak silme islemi calisiyor. */
            deleteItem={() => dispatch(deleteTodo(todo.key))}
          />
        ))}
      </div>

      {/* Open The New Task Components */}
      <AddTask onAdd={openNewTask} />

      {isView ? <NewTask cancelTask={openNewTask} /> : null}
    </>
  );
}
