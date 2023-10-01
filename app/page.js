"use client";

import React, { useEffect, useState } from "react";
import Settings from "./components/Settings/settings";
import Setting from "./components/Settings/Setting/setting";
import Timer from "./components/Timer/timer";
import TodoList from "./components/Task/todoList";
import Loading from "./components/loading";

export default function Home() {
  const [viewSetting, setViewSetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const createSettings = () => {
    setViewSetting(!viewSetting);
  };

  useEffect(() => {
    setIsLoading(false);
    setTimeout(() => {
      setIsLoading(true);
    }, 100);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col items-center">
          <Settings settingTask={createSettings} />
          {viewSetting && <Setting closeSetting={createSettings} />}
          <div>
            <Timer />
            <TodoList />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
