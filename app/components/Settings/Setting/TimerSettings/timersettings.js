"use client";
import React from "react";
import HeaderStyles from "../../header.module.scss";
import { useSelector, useDispatch } from "react-redux";

export default function Timersettings() {
  const dispatch = useDispatch();
  const pomoTime = useSelector((state) => state.timerSetting.pomoTime);
  const shortBreak = useSelector((state) => state.timerSetting.shortBreak);
  const longBreak = useSelector((state) => state.timerSetting.longBreak);

  const timerItem = [
    {
      key: 1,
      name: "Pomodoro",
      value: pomoTime,
      max: 100,
      min: 1,
      up: "pomoUp",
      down: "pomoDown",
    },
    {
      key: 2,
      name: "ShortBreak",
      value: shortBreak,
      max: 100,
      min: 1,
      up: "shortUp",
      down: "shortDown",
    },
    {
      key: 3,
      name: "LongBreak",
      value: longBreak,
      max: 100,
      min: 1,
      up: "longUp",
      down: "longDown",
    },
  ];

  const handleClick = (e) => {
    console.log(e.target.name);
  };

  return (
    <div>
      <div className={HeaderStyles.timerSettting}>
        {timerItem.map((item) => (
          <div key={item.key} className={HeaderStyles.timerItem}>
            <p>{item.name}</p>
            <p>{item.value}</p>
            <div>
              <button onClick={handleClick} name="up">
                Up
              </button>
              <button onClick={handleClick} name="down">
                Down
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
