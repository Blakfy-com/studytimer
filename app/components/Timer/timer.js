"use client";
import React, { useState, useEffect, useRef } from "react";
import TimerStyles from "./timer.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { resetPomoCount, incPomoCount } from "@/Redux/Slices/timerSlice";

// let START_MINUTES = "25";
let START_SECOND = "0";
let START_DURATION = 10;

export default function TimerMain() {
  const dispatch = useDispatch();
  const { taskName, pomoCounter, pomoTime, shortBreak, longBreak } =
    useSelector((state) => state.timerSetting);

  const [currentMinutes, setMinutes] = useState(pomoTime);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isStatus, setIsStatus] = useState(pomoTime);

  //------------------ TIMER COUNTER ------------

  const pomodoroBtn = () => {
    resetHandler();
    setMinutes(pomoTime);
    setDuration(pomoTime * 60);
    setIsStatus(pomoTime);
    document.body.style.backgroundColor = "";
    document.body.style.transition = "0.5s";
  };

  const shortBreakBtn = () => {
    resetHandler();
    setMinutes(shortBreak);
    setDuration(shortBreak * 60);
    setIsStatus(shortBreak);
    document.body.style.backgroundColor = "#38858A";
    document.body.style.transition = "0.5s";
  };

  const longBreakBtn = () => {
    resetHandler();
    setMinutes(longBreak);
    setDuration(longBreak * 60);
    setIsStatus(longBreak);
    document.body.style.backgroundColor = "#608CAB";
    document.body.style.transition = "0.5s";
  };

  const startHandler = () => {
    // BURADAKI SEC VE MIN TIMERIN ISLEYISINI ETKILIYOR
    setDuration(
      parseInt(currentSeconds, 20) + 60 * parseInt(currentMinutes, 10)
    );
    // setMinutes(60 * 5);
    // setSeconds(0);
    setIsRunning(true);
  };

  const stopHandler = () => {
    // stop timer
    setIsStop(true);
    setIsRunning(false);
  };

  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
  };

  const resetHandler = () => {
    // BURADAKI MIN VE SEC DUR DEGERLERINI KONTROL ET START SISTEMI ILE CAKISICAKTIR.
    setMinutes(isStatus); // Burada işlev değişecek

    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION);
  };

  useEffect(() => {
    if (isRunning === true) {
      // BURADAKI DURACTION USESTATE DEN GELIYOR !

      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 58) {
          resetHandler();
          if (isStatus === pomoTime) {
            dispatch(incPomoCount());
          }
        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [duration, isRunning]);

  // ------------------ POMODO COUNTER RESET  ------------
  function resetPomodoroCounter() {
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
    <div className={TimerStyles.container}>
      <div className={TimerStyles.timer}>
        {/*------------------ POMODORO STATUS BUTTON ------------*/}
        <div className={TimerStyles.button}>
          <button onClick={pomodoroBtn}>Pomodoro</button>
          <button onClick={shortBreakBtn}>Short</button>
          <button onClick={longBreakBtn}>Long</button>
        </div>

        {/*------------------ TIMER ------------*/}
        <div className={TimerStyles.time}>
          {String(currentMinutes).padStart(2, "0")}:
          {String(currentSeconds).padStart(2, "0")}
        </div>

        {/*------------------ START PAUSE RESET BUTTON ------------*/}
        <div className={TimerStyles.start}>
          <div className={TimerStyles.startResetButton}>
            {!isRunning && !isStop && (
              <button
                className={TimerStyles.startButton}
                onClick={startHandler}>
                START
              </button>
            )}
            {isRunning && (
              <button className={TimerStyles.startButton} onClick={stopHandler}>
                PAUSE
              </button>
            )}

            {isStop && (
              <button
                className={TimerStyles.startButton}
                onClick={resumeHandler}>
                START
              </button>
            )}
            {/* >| NEXT Button */}
            <button
              onClick={resetHandler}
              name="nextBtn"
              className={TimerStyles.resetButton}>
              <i
                // onClick={(e) => e.target.parentNode.click()}
                onClick={resetHandler}
                className="fa-solid fa-forward-step"
              />
              {/* //! Burasi Duzenlenecek. */}
              <i>Next</i>
            </button>
          </div>
        </div>
      </div>

      {/*------------------ POMODO COUNTER  ------------*/}

      <button className={TimerStyles.level} onClick={resetPomodoroCounter}>
        {pomoCounter}
      </button>

      {/*------------------ TASK NAME ------------*/}

      <div className={TimerStyles.tasksLevel}>{taskName}</div>
    </div>
  );
}
