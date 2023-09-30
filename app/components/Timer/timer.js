"use client";
import React, { useState, useEffect, useRef } from "react";
import TimerStyles from "./timer.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { resetPomoCount, incPomoCount } from "@/Redux/Slices/timerSlice";
import TimerButton from "./timerButton";

import Image from "next/image";

// let START_MINUTES = "25";
let START_SECOND = "0";
let START_DURATION = 10;

export default function TimerMain() {
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

  const [currentMinutes, setMinutes] = useState(timertLists[0].value);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(timertLists[0].value);
  const [isRunning, setIsRunning] = useState(false);
  const [isStatus, setIsStatus] = useState(timertLists[0].value);

  //------------------ TIMER COUNTER ------------

  const pomodoroBtn = () => {
    const newItem = timerList.find((item) => item.name === "Pomodoro");
    resetHandler(newItem.value);
    setMinutes(newItem.value);
    setDuration(newItem.value * 60);
    setIsStatus(newItem.value);
    document.body.style.backgroundColor = "";
    document.body.style.transition = "0.5s";
  };

  const shortBreakBtn = () => {
    const newItem = timerList.find((item) => item.name === "ShortBreak");
    resetHandler(newItem.value);
    setMinutes(newItem.value);
    setDuration(newItem.value * 60);
    setIsStatus(newItem.value);
    document.body.style.backgroundColor = "#38858A";
    document.body.style.transition = "0.5s";
  };

  const longBreakBtn = () => {
    const newItem = timerList.find((item) => item.name === "LongBreak");
    resetHandler(newItem.value);
    setMinutes(newItem.value);
    setDuration(newItem.value * 60);
    setIsStatus(newItem.value);
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
        if (--timer <= 0) {
          resetHandler();
          if (isStatus === currentMinutes) {
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
    let text = "ALL TASK AND LOCAL STORAGE CLEAR ?";
    // confirm() alert method.
    if (confirm(text) === true) {
      dispatch(resetPomoCount());
      localStorage.clear();
      window.location.reload();
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
          {/* <button onClick={pomodoroBtn}>Pomodoro</button>
          <button onClick={shortBreakBtn}>Short</button>
          <button onClick={longBreakBtn}>Long</button> */}
          <TimerButton
            pomodoroBtn={pomodoroBtn}
            shortBreakBtn={shortBreakBtn}
            longBreakBtn={longBreakBtn}
          />
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
              <Image
                src="/next-verify.png"
                width={50}
                height={50}
                alt="reset-icon"
                onClick={resetHandler}
                name="nextBtn"
              />
            </button>
          </div>
        </div>
      </div>

      {/*------------------ POMODO COUNTER  ------------*/}

      <button className={TimerStyles.level} onClick={resetPomodoroCounter}>
        {timertLists[3].value}
      </button>

      {/*------------------ TASK NAME ------------*/}

      <div className={TimerStyles.tasksLevel}>THIS IS TASK NAME</div>
    </div>
  );
}
