"use client";

import React from "react";
import Settings from "./components/Settings/settings";
import Timer from "./components/Timer/timer";

import TodoList from "./components/Task/todoList";

export default function Home() {
  const createSettings = () => {
    console.log("TIKLANDI LAN");
  };
  return (
    <div className="flex flex-col items-center">
      <Settings settingTask={createSettings} />

      <div>
        <Timer />
        <TodoList />
      </div>
    </div>
  );
}
