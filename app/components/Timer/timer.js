"use client";

import React, { useState, useEffect } from "react";
import TimerCss from "./timer.module.scss";

//! Redux Tool Import
import { useSelector, useDispatch } from "react-redux";
import { resetPomoCount, incPomoCount } from "@/Redux/Slices/timerSlice";

export default function TimerMain() {
  //! Dispatch
  const dispatch = useDispatch();
  //! Selector
  const { taskName, pomoCounter, pomoTime } = useSelector(
    (state) => state.timerSetting
  );
  //! useState`s
  const [minutes, setMinutes] = useState(pomoTime);
  const [seconds, setSeconds] = useState(0);

  // ------------------ TIMER START ------------
  const handleStart = () => {
    const totalSeconds = minutes * 60;
    let remainingSeconds = totalSeconds;
    startTimer(remainingSeconds);
  };

  // ------------------ TIMER COUNTER ------------
  const startTimer = (remainingSeconds) => {
    const interval = setInterval(() => {
      if (remainingSeconds <= 0) {
        clearInterval(interval);
      } else {
        const newMinutes = Math.floor(remainingSeconds / 60);
        const newSeconds = remainingSeconds % 60;
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        remainingSeconds -= 1;
        console.log(remainingSeconds);
      }
    }, 1000);
  };

  // ------------------ POMODO COUNTER RESET  ------------
  function resPomoCounter() {
    let text = "Tasks Restart ?";
    // confirm() alert method.
    if (confirm(text) === true) {
      dispatch(resetPomoCount());
      alert("Okey");
    } else {
      alert("TASKS CANCEL");
    }
  }

  return (
    <div className={TimerCss.container}>
      <div className={TimerCss.timer}>
        {/*------------------ POMO SHORT LONG BUTTON ------------*/}
        <div className={TimerCss.button}>
          <button className="buttonActive">Pomodoro</button>
          <button>Short Break</button>
          <button>Long Break</button>
        </div>

        {/*------------------ TIMER ------------*/}
        <div className={TimerCss.time}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        {/*------------------ START PAUSE RESET BUTTON ------------*/}
        <div className={TimerCss.start}>
          <div className={TimerCss.startResetButton}>
            <button className={TimerCss.startButton}>Start</button>
            <button className={TimerCss.resetButton}>
              <i className="fa-solid fa-forward-step" />
            </button>
          </div>
        </div>
      </div>

      {/*------------------ POMODO COUNTER  ------------*/}

      <button className={TimerCss.level} onClick={resPomoCounter}>
        {pomoCounter}
      </button>

      {/*------------------ TASK NAME ------------*/}

      <div className={TimerCss.tasksLevel}>{taskName}</div>
    </div>
  );
}
