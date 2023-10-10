import React, { useState, useEffect } from "react";
import TimerStyles from "./timer.module.scss";
import TimerButton from "./timerButton";

import StartButtons from "./startButtons";
import Nextbutton from "./nextButton";

import { useSelector, useDispatch } from "react-redux";
import { resetPomoCount, incrementPomoCount } from "@/Redux/Slices/timerSlice";
import { incTaskCurrent, setStatus } from "@/Redux/Slices/taskSlice";
import { setColors } from "@/Redux/Slices/colorSlice";

// Sabitler
const START_SECOND = 0;

export default function TimerMain() {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.timerSetting);
  const { data } = useSelector((state) => state.dataAnalysis);
  const { colorSettings } = useSelector((state) => state.colorSettings);

  const [currentMinutes, setMinutes] = useState(settings.pomodoroTime);
  const [duration, setDuration] = useState(settings.pomodoroTime);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTask, setActiveTask] = useState("");

  function dataCount() {
    let newData = [];
    let newActiveTAsk = [];

    for (let i = 0; i < data.length; i++) {
      if (!data[i].status && data[i].currentSession !== data[i].totalSessions) {
        newData.push(data[i].key);
        newActiveTAsk.push(data[i].text);
      }
      if (newData.length > 0) {
        newData.sort((a, b) => a - b);
        newActiveTAsk.sort((a, b) => a - b);
        setActiveTask(newActiveTAsk[0]);
        return newData[0];
      }
    }
  }

  const countTask = () => {
    if (data) {
      const count = dataCount();
      if (count !== null) {
        dispatch(incTaskCurrent(count));

        if (
          data[count] === null &&
          data[count] === undefined &&
          data[count].currentSession === data[count].totalSessions
        ) {
          dispatch(setStatus(dataCount()));
        }
      }
    } else {
      return "Veri Bulunamadi";
    }
  };

  function colorSettingsChange(status) {
    const colorMap = {
      pomodoroTime: colorSettings.focusColor,
      shortBreakTime: colorSettings.shortBreakColor,
      longBreakTime: colorSettings.longBreakColor,
    };
    document.body.style.backgroundColor =
      colorMap[status] || colorSettings.focusColor;
  }

  useEffect(() => {
    // İlk girişte yapılması gerekenleri buraya yazın
    document.body.style.backgroundColor = colorSettings.focusColor;
    // Birinci girişte yapılacak işlemleri bir kez yapmak için boş bir bağımlılık dizisi verin
  }, []);

  // Timer ayarlarını güncelleyen fonksiyon
  const setTimer = (item, isStatus) => {
    setMinutes(item);
    setDuration(item * 60);
    setSeconds(START_SECOND);

    // Arka plan rengini ayarlayın
    colorSettingsChange(isStatus);
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

  const startResetButtonContent = () => {
    if (!isRunning && !isStop) {
      return (
        <StartButtons
          text="START"
          buttonClick={startHandler}
          buttonColor={colorSettings.focusColor}
        />
      );
    } else if (isRunning) {
      return (
        <>
          <StartButtons
            text="PAUSE"
            buttonClick={stopHandler}
            buttonColor={colorSettings.focusColor}
          />
          <Nextbutton click={resetTimer} name="nextBtn" />
        </>
      );
    } else {
      return (
        <>
          <StartButtons
            text="START"
            buttonClick={resumeHandler}
            buttonColor={colorSettings.focusColor}
          />
          <Nextbutton click={resetTimer} name="nextBtn" />
        </>
      );
    }
  };

  // Timer'ı çalıştıran ve durduran useEffect
  useEffect(() => {
    if (isRunning) {
      let timer = duration;

      const interval = setInterval(() => {
        if (--timer <= 1497) {
          resetTimer();
          dispatch(incrementPomoCount());
          countTask();
        } else {
          const minutes = parseInt(timer / 60, 10);
          const seconds = parseInt(timer % 60, 10);
          setMinutes(minutes < 10 ? "0" + minutes : minutes);
          setSeconds(seconds < 10 ? "0" + seconds : seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [duration, isRunning, data]);

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
        {/* Status Button */}
        <div className={TimerStyles.button}>
          <TimerButton
            pomodoroBtn={createTimerButtonHandler("pomodoroTime")}
            shortBreakBtn={createTimerButtonHandler("shortBreakTime")}
            longBreakBtn={createTimerButtonHandler("longBreakTime")}
          />
        </div>
        {/* Timer  */}
        <div className={TimerStyles.time}>
          {String(currentMinutes).padStart(2, "0")}:
          {String(currentSeconds).padStart(2, "0")}
        </div>
        {/* Button */}
        <div className={TimerStyles.startResetButton}>
          {startResetButtonContent()}
        </div>
      </div>
      {/* PomoCount */}
      <button className={TimerStyles.level} onClick={clearLocalStorage}>
        #{settings.pomoCount}
      </button>
      <div className={TimerStyles.tasksLevel}>
        {/* create data map function, status === true item.text */}

        {activeTask}
      </div>
    </div>
  );
}
