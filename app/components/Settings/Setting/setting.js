"use client";
import React from "react";
import Themesetting from "./ThemeSettings/themesetting";
import TimerSettings from "./TimerSettings/timersettings";
import HeaderStyles from "../header.module.scss";

export default function Setting({ closeSetting }) {
  const handleCloseClick = () => {
    closeSetting();
  };

  const handleReloadClick = () => {
    window.location.reload();
    windows.location.closeSetting();
  };
  return (
    <div className={HeaderStyles.setting}>
      <div className={HeaderStyles.container}>
        <div className={HeaderStyles.headerTitle}>
          <p>Settings</p>
          <div onClick={() => closeSetting()}>
            <p>X</p>
          </div>
        </div>
        <TimerSettings />
        <Themesetting />
        <div className={HeaderStyles.modal}>
          <button onClick={handleCloseClick}>Close</button>
          <button onClick={handleReloadClick}>Save</button>
        </div>
      </div>
    </div>
  );
}
