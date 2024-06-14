"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Settings/Navbar";
import Setting from "./components/Settings/Setting/setting";
import Timer from "./components/Timer/timer";
import TodoList from "./components/Task/todoList";
import TimeTracking from "./components/TimeTracking/TimeTracking";
import Loading from "./components/loading";
import Colorsetting from "./components/Settings/Setting/ThemeSettings/colorsetting";
import { useSelector } from "react-redux";

export default function Home() {
  const [viewSetting, setViewSetting] = useState(false);
  const [colorSetting, setColorSetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSelector((state) => state.dataAnalysis);

  const [selectedKey, setSelectedKey] = useState(null);
  const createSettings = () => {
    setViewSetting(!viewSetting);
  };

  useEffect(() => {
    setIsLoading(false);
    setTimeout(() => {
      setIsLoading(true);
    }, 100);
  }, []);

  const handleThemeSetting = () => {
    setViewSetting(!viewSetting);
    setColorSetting(!colorSetting);
  };

  const setColorId = (e) => {
    setSelectedKey(e);
  };

  const view = () => {
    if (viewSetting) {
      return (
        <Setting
          closeSetting={createSettings}
          handleColorClick={(e) => {
            setColorId(e);
            handleThemeSetting();
          }}
        />
      );
    } else if (colorSetting) {
      {
        return (
          <Colorsetting
            closeColorSetting={handleThemeSetting}
            selectedId={selectedKey}
          />
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col items-center">
          {/* Navabar Button */}
          <Navbar settingTask={createSettings} />

          {/* Setting Pop-up */}
          {view()}

          <div>
            <Timer />
            <TodoList />
            {data.length > 0 ? <TimeTracking /> : null}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
