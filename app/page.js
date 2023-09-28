"use client";

import React, { useState } from "react";
import Settings from "./components/Settings/settings";
import Setting from "./components/Settings/setting";
import Timer from "./components/Timer/timer";

import TodoList from "./components/Task/todoList";

export default function Home() {
  const [viewSetting, setViewSetting] = useState(false);
  const createSettings = () => {
    setViewSetting(!viewSetting);
  };
  return (
    <div className="flex flex-col items-center">
      <Settings settingTask={createSettings} />
      {viewSetting && <Setting />}
      <div>
        <Timer />
        <TodoList />
      </div>
    </div>
  );
}
