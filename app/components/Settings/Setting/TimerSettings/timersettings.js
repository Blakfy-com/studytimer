"use client";
import React from "react";
import HeaderStyles from "../../header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setTimerSettings } from "@/Redux/Slices/timerSlice";
export default function Timersettings() {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.timerSetting);

  const pomoTime = settings.pomodoroTime;
  const shortBreak = settings.shortBreakTime;
  const longBreak = settings.longBreakTime;

  const timerItem = [
    {
      key: 1,
      name: "Pomodoro",
      value: pomoTime,
      max: 100,
      min: 1,
    },
    {
      key: 2,
      name: "ShortBreak",
      value: shortBreak,
      max: 100,
      min: 1,
    },
    {
      key: 3,
      name: "LongBreak",
      value: longBreak,
      max: 100,
      min: 1,
    },
  ];

  const handleChange = (e) => {
    switch (e.target.name) {
      case "Pomodoro":
        dispatch(
          setTimerSettings({
            settingName: "pomodoroTime",
            value: e.target.value,
          })
        );
        break;
      case "ShortBreak":
        dispatch(
          setTimerSettings({
            settingName: "shortBreakTime",
            value: e.target.value,
          })
        );
        break;
      case "LongBreak":
        dispatch(
          setTimerSettings({
            settingName: "longBreakTime",
            value: e.target.value,
          })
        );
        break;
      default:
        console.log("timerSettings.js handleChange error");
        break;
    }
  };

  return (
    <div className={HeaderStyles.timerSettting}>
      {timerItem.map((item) => (
        <div key={item.key}>
          <p>{item.name}</p>
          <input
            name={item.name}
            type="number"
            min={item.min}
            max={item.max}
            step="1" // Sayinin + 1 artacagini belirler.
            onChange={handleChange}
            defaultValue={item.value}
          />
        </div>
      ))}
    </div>
  );
}
