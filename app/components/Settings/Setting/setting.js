"use client";
import React from "react";
import Themesetting from "./ThemeSettings/themesetting";
import TimerSettings from "./TimerSettings/timersettings";
import LongBreakInterval from "./LongBreakInterval/longBreakInterval";
import HeaderStyles from "../header.module.scss";
import AudioSettings from "./AudioSettings/audiosettings";
import ExitSvg from "../../icons/exit/exit";

export default function Setting({ closeSetting }) {
  const handleCloseClick = () => {
    closeSetting(); // Setting Window Close
  };

  const handleReloadClick = () => {
    window.location.reload(); // Page Reload
    windows.location.closeSetting(); // Setting Window Close
  };
  return (
    <div className={HeaderStyles.setting}>
      <div className={HeaderStyles.container}>
        <div className={HeaderStyles.headerTitle}>
          <p>Settings</p>
          <div onClick={() => closeSetting()}>
            <p>
              <ExitSvg />
            </p>
          </div>
        </div>
        <TimerSettings />
        <LongBreakInterval />
        <Themesetting />
        <AudioSettings />
        <div className={HeaderStyles.modal}>
          <button onClick={handleCloseClick}>Close</button>
          <button onClick={handleReloadClick}>Save</button>
        </div>
      </div>
    </div>
  );
}
