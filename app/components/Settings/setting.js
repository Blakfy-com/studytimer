"use client";
import React from "react";
import Themesetting from "./ThemeSettings/themesetting";
import TimerSettings from "./TimerSettings/timersettings";
import HeaderStyles from "./header.module.scss";

export default function Setting() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className={HeaderStyles.setting}>
      <div className={HeaderStyles.container}>
        <div className={HeaderStyles.headerTitle}>
          <p>Settings</p>
          <p>X</p>
        </div>
        <TimerSettings />
        <Themesetting />
      </div>
    </div>
  );
}
