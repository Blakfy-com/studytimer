"use client";
import React from "react";
import HeaderStyles from "../../header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setPomoTime,
  setShortBreak,
  setLongBreak,
} from "@/Redux/Slices/timerSlice";
export default function Timersettings() {
  const dispatch = useDispatch();
  const { timerList } = useSelector((state) => state.timerSetting);
  const timertLists = timerList.map((item) => {
    return {
      key: item.key,
      name: item.name,
      value: item.value,
      max: item.max,
      min: item.min,
    };
  });

  const pomoTime = timertLists[0].value;
  const shortBreak = timertLists[1].value;
  const longBreak = timertLists[2].value;

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
        dispatch(setPomoTime(e.target.value));
        break;
      case "ShortBreak":
        dispatch(setShortBreak(e.target.value));
        break;
      case "LongBreak":
        dispatch(setLongBreak(e.target.value));
        break;
      default:
        console.log("error");
        break;
    }
  };

  return (
    <div>
      <div className={HeaderStyles.timerSettting}>
        {timerItem.map((item) => (
          <div key={item.key} className={HeaderStyles.timerItem}>
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
    </div>
  );
}
