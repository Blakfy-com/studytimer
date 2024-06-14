"use client";

import React, { useState, useEffect } from "react";
import TimerCss from "./timer.module.scss";
import { useSelector, useDispatch } from "react-redux";

const pomodoroColor = "#ba4949";
const shortBreakColor = "#38858A";
const longBreakColor = "#7D53A2";

export default function TimerMain(props) {
  const dispatch = useDispatch();
  const { pomoTime, shortBreak, longBreak, activeTimer } = useSelector(
    (state) => state.timerSetting
  );

  const [activeButton, setActiveButton] = useState("pomodoro");
  const [minutes, setMinutes] = useState(pomoTime);
  const [seconds, setSeconds] = useState(0);
  const [timerStatus, setTimerStatus] = useState("Start");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    let bgColor = "";
    switch (activeButton) {
      case "pomodoro":
        setMinutes(pomoTime);
        bgColor = pomodoroColor;
        break;
      case "shortBreak":
        setMinutes(shortBreak);
        bgColor = shortBreakColor;
        break;
      case "longBreak":
        setMinutes(longBreak);
        bgColor = longBreakColor;
        break;
      default:
        break;
    }
    document.body.style.backgroundColor = bgColor;
    document.body.style.transition = "1s";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [activeButton, pomoTime, shortBreak, longBreak]);

  const handleClickButton = (buttonName) => {
    setActiveButton(buttonName);
  };

  function handleRestart() {
    setMinutes(pomoTime); // Pomodoro süresini başlangıçta ayarlayın
    setSeconds(0); // Saniyeleri sıfırlayın
    setTimerStatus("Start"); // Timer durumu "Start" olarak ayarlayın
    startTimer(pomoTime * 60); // Pomodoro süresi ile yeni bir sayaç başlatın
    clearInterval(intervalId); // Mevcut zamanlayıcıyı temizleyin
  }

  const handleStart = () => {
    const totalSeconds = minutes * 60;
    let remainingSeconds = totalSeconds;

    switch (timerStatus) {
      case "Start":
        setTimerStatus("Pause");
        startTimer(remainingSeconds);
        break;
      case "Pause":
        setTimerStatus("Resume");
        clearInterval(intervalId);
        break;
      case "Resume":
        setTimerStatus("Restart");
        startTimer(minutes * 60 + seconds - 1);
        break;
      case "Restart":
        handleRestart(); // Restart işlemi için handleRestart fonksiyonunu çağırın
        break;
      default:
        break;
    }
  };

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

  return (
    <div className={TimerCss.container}>
      <div className={TimerCss.timer}>
        <div className={TimerCss.button}>
          <button
            className={activeButton === "pomodoro" ? "buttonActive" : ""}
            onClick={() => handleClickButton("pomodoro")}>
            Pomodoro
          </button>
          <button
            className={activeButton === "shortBreak" ? "buttonActive" : ""}
            onClick={() => handleClickButton("shortBreak")}>
            Short Break
          </button>
          <button
            className={activeButton === "longBreak" ? "buttonActive" : ""}
            onClick={() => handleClickButton("longBreak")}>
            Long Break
          </button>
        </div>

        <div className={TimerCss.time}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        <div className={TimerCss.start}>
          <div>
            <button className={TimerCss.sprButton} onClick={handleStart}>
              {timerStatus}
            </button>

            {timerStatus !== "Start" ? (
              <button
                className={TimerCss.reset}
                onClick={handleRestart}
                value="Restart">
                Reset
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className={TimerCss.level}>1</div>
      <div className={TimerCss.tasksLevel}>Burasi taskin header alanidir</div>
    </div>
  );
}
