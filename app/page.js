"use client";

import React from "react";
import Setting from "./components/Settings/settings";
import Timer from "./components/Timer/timer";

import TodoList from "./components/Task/todoList";

export default function Home() {
  return (
    <div>
      <Setting />

      <div className="flex flex-col items-center">
        <Timer />
        <TodoList />
      </div>
    </div>
  );
}
