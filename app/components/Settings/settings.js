"use client";
import React, { useState } from "react";
import Script from "next/script";
import HeaderStyles from "./header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setPomoTime,
  setShortBreak,
  setLongBreak,
} from "../../../Redux/Slices/timerSlice";

export default function Header(props) {
  const pomoTime = useSelector((state) => state.timerSetting.pomoTime);
  const shortBreak = useSelector((state) => state.timerSetting.shortBreak);
  const longBreak = useSelector((state) => state.timerSetting.longBreak);

  const dispatch = useDispatch();
  const [isDpHid, setIsDpHid] = React.useState(false);
  const handleClick = (e) => {
    switch (e.target.name) {
      case "settingsOpen":
      case "settingClose":
      case "allButton":
        setIsDpHid(!isDpHid);
        console.log(e.target.name);
        break;
    }
  };

  const handleChange = (e) => {
    const newPomoTime = e.target.value;
    switch (e.target.id) {
      case "pomoTime":
        dispatch(setPomoTime(newPomoTime));
        break;
      case "shortBreak":
        dispatch(setShortBreak(newPomoTime));
        break;
      case "longBreak":
        dispatch(setLongBreak(newPomoTime));
        break;
      default:
        console.error("Error");
        break;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" flex justify-between  w-[600px] h-20 ">
        <div className="flex items-center">
          <i className="fa-solid fa-heart pr-2 text-white"></i>
          <p className="text-2xl text-white">Study Timeer</p>
        </div>

        <div className="flex items-center ">
          <button
            name="settingsOpen"
            type="button"
            onClick={handleClick}
            className=" w-28 h-10 rounded-lg bg-[#aaaa] text-[#f2f2f2]">
            Settings
          </button>

          <div
            style={isDpHid ? { display: "" } : { display: "none" }}
            onClick={handleClick}
            className={HeaderStyles.timerSettings}>
            <div className={HeaderStyles.timeSet}>
              <button
                name="settingClose"
                type="button"
                onClick={handleClick}
                className="text-3xl w-10 h-10 absolute  right-1 top-1  fa-solid fa-xmark"></button>
              <div className={HeaderStyles.timerValues}>
                <input
                  id="pomoTime"
                  onChange={handleChange}
                  className={HeaderStyles.setNumber}
                  type="number"
                  defaultValue={pomoTime}
                  min={1}
                  max={100}
                />
                <input
                  id="shortBreak"
                  onChange={handleChange}
                  className={HeaderStyles.setNumber}
                  type="number"
                  defaultValue={shortBreak}
                  min={1}
                  max={100}
                />
                <input
                  id="longBreak"
                  onChange={handleChange}
                  className={HeaderStyles.setNumber}
                  type="number"
                  defaultValue={longBreak}
                  min={1}
                  max={100}
                />
              </div>
              <div>
                <button
                  name="settingClose"
                  className={HeaderStyles.okButton}
                  onClick={handleClick}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>

        <Script
          src="https://kit.fontawesome.com/219ba811c1.js"
          crossorigin="anonymous"
          defer></Script>
      </div>
    </div>
  );
}
