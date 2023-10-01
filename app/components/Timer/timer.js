import React, { useState, useEffect } from "react";
import TimerStyles from "./timer.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { resetPomoCount, incPomoCount } from "@/Redux/Slices/timerSlice";
import { increment } from "@/Redux/Slices/taskSlice";
import TimerButton from "./timerButton";
import NextSvg from "../icons/next/next";

// Sabitler
const START_SECOND = 0;
const START_DURATION = 10;

export default function TimerMain() {
  const dispatch = useDispatch();
  const { timerList } = useSelector((state) => state.timerSetting);

  // TimerList öğelerini formatlayarak kullanımı kolaylaştırın
  const formattedTimerList = timerList.map((item) => ({
    key: item.key,
    name: item.name,
    value: item.value,
    max: item.max,
    min: item.min,
  }));

  // State'leri tanımlayın ve başlangıç değerleri atayın
  const [currentMinutes, setMinutes] = useState(formattedTimerList[0].value);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(formattedTimerList[0].value * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isStatus, setIsStatus] = useState(formattedTimerList[0].value);

  // Timer ayarlarını güncelleyen fonksiyon
  const setTimer = (item) => {
    resetHandler(item.value);
    setMinutes(item.value);
    setDuration(item.value * 60);
    setIsStatus(item.value);

    // Arka plan rengini ayarlayın
    const backgroundColor = {
      Pomodoro: "",
      ShortBreak: "#38858A",
      LongBreak: "#608CAB",
    };

    document.body.style.backgroundColor = backgroundColor[item.name];
    document.body.style.transition = "0.5s";
  };

  // Pomodoro, ShortBreak ve LongBreak butonlarını oluşturan fonksiyonlar
  const createTimerButtonHandler = (timerName) => () => {
    const newItem = formattedTimerList.find((item) => item.name === timerName);
    setTimer(newItem);
  };

  // Start, Stop, Resume ve Reset işlemlerini yöneten fonksiyonlar
  const startHandler = () => {
    setDuration(currentSeconds + 60 * currentMinutes);
    setIsRunning(true);
  };

  const stopHandler = () => {
    setIsStop(true);
    setIsRunning(false);
  };

  const resumeHandler = () => {
    let newDuration = currentMinutes * 60 + currentSeconds;
    setDuration(newDuration);
    setIsRunning(true);
    setIsStop(false);
  };

  const resetHandler = () => {
    setMinutes(isStatus);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION * 60);
  };

  // Timer'ı çalıştıran ve durduran useEffect
  useEffect(() => {
    if (isRunning) {
      let timer = duration;
      const interval = setInterval(() => {
        if (--timer <= 58) {
          resetHandler();
          dispatch(incPomoCount());
        } else {
          const minutes = parseInt(timer / 60, 10);
          const seconds = parseInt(timer % 60, 10);
          setMinutes(minutes < 10 ? "0" + minutes : minutes);
          setSeconds(seconds < 10 ? "0" + seconds : seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [duration, isRunning, currentMinutes, isStatus, dispatch]);

  // Pomodoro sayacını sıfırlayan fonksiyon
  const resetPomodoroCounter = () => {
    const text = "ALL TASK AND LOCAL STORAGE CLEAR ?";
    if (window.confirm(text)) {
      dispatch(resetPomoCount());
      localStorage.clear();
      window.location.reload();
      alert("Okey");
    } else {
      alert("TASKS CANCEL");
    }
  };

  return (
    <div className={TimerStyles.container}>
      <div className={TimerStyles.timer}>
        <div className={TimerStyles.button}>
          <TimerButton
            pomodoroBtn={createTimerButtonHandler("Pomodoro")}
            shortBreakBtn={createTimerButtonHandler("ShortBreak")}
            longBreakBtn={createTimerButtonHandler("LongBreak")}
          />
        </div>
        <div className={TimerStyles.time}>
          {String(currentMinutes).padStart(2, "0")}:
          {String(currentSeconds).padStart(2, "0")}
        </div>
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
            <button name="nextBtn" className={TimerStyles.resetButton}>
              <NextSvg
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
      <button className={TimerStyles.level} onClick={resetPomodoroCounter}>
        {formattedTimerList[3].value}
      </button>
      <div className={TimerStyles.tasksLevel}>THIS IS TASK NAME</div>
    </div>
  );
}
