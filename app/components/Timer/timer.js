import React, { useState, useEffect } from "react";
import TimerStyles from "./timer.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { resetPomoCount, incrementPomoCount } from "@/Redux/Slices/timerSlice";
import { incPomoCount } from "@/Redux/Slices/taskSlice";
import TimerButton from "./timerButton";
import NextSvg from "../icons/next/next";

// Sabitler
const START_SECOND = 0;

export default function TimerMain() {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.timerSetting);
  const { data } = useSelector((state) => state.dataAnalysis);

  // State'leri tanımlayın ve başlangıç değerleri atayın
  const [currentMinutes, setMinutes] = useState(settings.pomodoroTime);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(settings.pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);

  // Timer ayarlarını güncelleyen fonksiyon
  const setTimer = (item, isStatus) => {
    setMinutes(item);
    setDuration(item * 60);
    setSeconds(START_SECOND);

    // Arka plan rengini ayarlayın
    const backgroundColor = {
      pomodoroTime: "",
      shortBreakTime: "#38858A",
      longBreakTime: "#608CAB",
    };

    document.body.style.backgroundColor = backgroundColor[isStatus];
    document.body.style.transition = "0.5s";
  };

  // Pomodoro, ShortBreak ve LongBreak butonlarını oluşturan fonksiyonlar
  const createTimerButtonHandler = (timerName) => () => {
    setTimer(settings[timerName], timerName);
  };

  // Start, Stop, Resume ve Reset işlemlerini yöneten fonksiyonlar
  const startHandler = () => {
    setDuration(currentMinutes * 60 + currentSeconds);
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

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(settings.pomodoroTime);
    setSeconds(START_SECOND);
    setDuration(settings.pomodoroTime * 60);
  };

  // Timer'ı çalıştıran ve durduran useEffect
  useEffect(() => {
    if (isRunning) {
      let timer = duration;
      const interval = setInterval(() => {
        if (--timer <= 1497) {
          resetTimer();
          dispatch(incrementPomoCount());
        } else {
          const minutes = parseInt(timer / 60, 10);
          const seconds = parseInt(timer % 60, 10);
          setMinutes(minutes < 10 ? "0" + minutes : minutes);
          setSeconds(seconds < 10 ? "0" + seconds : seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [duration, isRunning, currentMinutes]);

  // Pomodoro sayacını sıfırlayan fonksiyon
  const clearLocalStorage = () => {
    const text = "ALL TASK AND LOCAL STORAGE CLEAR ?";
    if (window.confirm(text)) {
      dispatch(resetPomoCount());
      localStorage.clear();
      window.location.reload();
      alert("LOCAL STORAGE CLEARED");
    } else {
      alert(
        "Resetting the timer counter and local storage has been cancelled."
      );
    }
  };

  return (
    <div className={TimerStyles.container}>
      <div className={TimerStyles.timer}>
        <div className={TimerStyles.button}>
          <TimerButton
            pomodoroBtn={createTimerButtonHandler("pomodoroTime")}
            shortBreakBtn={createTimerButtonHandler("shortBreakTime")}
            longBreakBtn={createTimerButtonHandler("longBreakTime")}
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
            <button
              onClick={resetTimer}
              name="nextBtn"
              className={TimerStyles.resetButton}>
              <NextSvg
                src="/next-verify.png"
                width={50}
                height={50}
                alt="reset-icon"
                name="nextBtn"
              />
            </button>
          </div>
        </div>
      </div>
      <button className={TimerStyles.level} onClick={clearLocalStorage}>
        #{settings.pomoCount}
      </button>
      <div className={TimerStyles.tasksLevel}>THIS IS TASK NAME</div>
    </div>
  );
}
