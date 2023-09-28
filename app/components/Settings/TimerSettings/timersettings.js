'use client'
import React from 'react'

import { useSelector, useDispatch } from "react-redux";

export default function Timersettings() {
    const dispatch = useDispatch();
    const pomoTime = useSelector((state) => state.timerSetting.pomoTime);
    const shortBreak = useSelector((state) => state.timerSetting.shortBreak);
    const longBreak = useSelector((state) => state.timerSetting.longBreak);

    const timerItem = [
        {
          id: 1,
          name: "pomodoro",
          value: pomoTime,
          max: 100,
          min: 1,
        },
        {
          id: 2,
          name: "shortBreak",
          value: shortBreak,
          max: 100,
          min: 1,
        },
        {
          id: 3,
          name: "longBreak",
          value: longBreak,
          max: 100,
          min: 1,
        },
      ];
    
  return (
    <div> <div className={HeaderStyles.timerSettting}>
    {timerItem.map((item) => (
      <div key={item.id} className={HeaderStyles.timerItem}>
        <p>{item.name}</p>
        <p>{item.value}</p>
        <div>
          <button name="up">Up</button>
          <button name="down">Down</button>
        </div>
      </div>
    ))}
  </div></div>
  )
}
