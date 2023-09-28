"use client";
import React from "react";
import Themesetting from "./ThemeSettings/themesetting";
import TimerSettings from "./TimerSettings/timersettings";
import HeaderStyles from "../header.module.scss";

export default function Setting({ closeSetting }) {
  const handleChange = (e) => {
    console.log(e.target.value);
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
      </div>
    </div>
  );
}
