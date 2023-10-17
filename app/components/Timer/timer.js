import React, { useState, useEffect } from "react";
import TimerStyles from "./timer.module.scss";
import TimerButton from "./timerButton";
import StartButtons from "./startButtons";
import Nextbutton from "./nextButton";
import { useSelector, useDispatch } from "react-redux";
import { resetPomoCount, incrementPomoCount } from "@/Redux/Slices/timerSlice";
import { incTaskCurrent } from "@/Redux/Slices/taskSlice";

export default function TimerMain() {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.timerSetting);
  const { data } = useSelector((state) => state.dataAnalysis);
  const { colorSettings } = useSelector((state) => state.colorSettings);

  const [currentMinutes, setMinutes] = useState(settings.pomodoroTime);
  const [duration, setDuration] = useState(settings.pomodoroTime * 60);
  const [currentSeconds, setSeconds] = useState(0);

  const [isStop, setIsStop] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  // 'initialActiveTask' değeri 'data[0].text' olur, aksi halde 'undefined' olur.
  const initialActiveTask =
    data && data.length > 0 && data[0].text ? data[0].text : "Study Timerr";
  // 'useState' hook'u, 'initialActiveTask' değerini 'activeTask' olarak ayarlar.
  const [activeTask, setActiveTask] = useState(initialActiveTask);

  const [isActiveStatusButton, setIsActiveStatusButton] = useState("pomodoro");
  const [isStatus, setStatus] = useState("shortBreak");
  const [title, setTitle] = useState("Study Timerr");
  const [startButtonColor, setStartButtonColor] = useState(
    colorSettings.focusColor
  );

  const [resetStatusName, setResetStatusName] = useState("pomodoroTime");

  function dataCount() {
    let newData = [];
    let newActiveTask = [];

    for (let i = 0; i < data.length; i++) {
      if (!data[i].status && data[i].currentSession !== data[i].totalSessions) {
        newData.push(data[i].key);
        newActiveTask.push(data[i].text);
      }
    }

    if (newData.length > 0) {
      newData.sort((a, b) => a - b);
      newActiveTask.sort((a, b) => a - b);
      setActiveTask(newActiveTask[0]);
      return newData[0];
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
      } else {
        return "Veri Bulunamadi";
      }
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

  const setTimer = (item, isStatus) => {
    setMinutes(item);
    setDuration(item * 60);
    setSeconds(0);
    colorSettingsChange(isStatus);
    document.body.style.transition = "0.5s";
  };

  const createTimerButtonHandler = (timerName) => () => {
    setTimer(settings[timerName], timerName);

    if (timerName === "pomodoroTime") {
      setIsActiveStatusButton("pomodoro");
      setStartButtonColor(colorSettings.focusColor);
      setResetStatusName("pomodoroTime");
    } else if (timerName === "shortBreakTime") {
      setIsActiveStatusButton("shortBreak");
      setStartButtonColor(colorSettings.shortBreakColor);
      setResetStatusName("shortBreakTime");
    } else if (timerName === "longBreakTime") {
      setIsActiveStatusButton("longBreak");
      setStartButtonColor(colorSettings.longBreakColor);
      setResetStatusName("longBreakTime");
    }
  };

  const startHandler = () => {
    setDuration(currentMinutes * 60 + currentSeconds);
    setIsRunning(true);
  };

  const stopHandler = () => {
    setIsStop(true);
    setIsRunning(false);
  };

  const resumeHandler = () => {
    let newDuration = duration;
    console.log(newDuration);
    setDuration(newDuration);
    setIsRunning(true);
    setIsStop(false);
  };

  const resetTimer = () => {
    setTitle("Study Timerr");
    switch (resetStatusName) {
      case "pomodoroTime":
        setMinutes(settings.pomodoroTime);
        break;
      case "shortBreakTime":
        setMinutes(settings.shortBreakTime);
        break;
      case "longBreakTime":
        setMinutes(settings.longBreakTime);
        break;
    }
    setIsRunning(false); // Surenin Calismasini durdurur.
    setIsStop(false); // Sifirlama Buttonunu gizler.
    setSeconds(0);
  };

  const startResetButtonContent = () => {
    if (!isRunning && !isStop) {
      return (
        <StartButtons
          text="START"
          buttonClick={startHandler}
          buttonColor={startButtonColor}
        />
      );
    } else if (isRunning) {
      return (
        <>
          <StartButtons
            text="PAUSE"
            buttonClick={stopHandler}
            buttonColor={startButtonColor}
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
            buttonColor={startButtonColor}
          />
          <Nextbutton click={resetTimer} name="nextBtn" />
        </>
      );
    }
  };

  const isCatogeryStatus = (status) => {
    let counter = settings.pomoCount; // 0
    let longBreak = settings.longBreakInterval; // 4
    let newCount = counter % longBreak; // 0 1 2 3 0 1 2 3 0

    switch (status) {
      case "pomodoro":
        createTimerButtonHandler("pomodoroTime")();
        setIsActiveStatusButton("pomodoro");
        if (newCount < longBreak - 1) {
          setStatus("shortBreak");
        } else {
          setStatus("longBreak");
        }
        if (settings.pomoCount === 0) {
          dispatch(incrementPomoCount()); // Default Task Count Inc +1
          countTask();
        }
        break;
      case "shortBreak":
        createTimerButtonHandler("shortBreakTime")();
        setIsActiveStatusButton("shortBreak");
        setStatus("pomodoro");
        dispatch(incrementPomoCount()); // Default Task Count Inc +1
        countTask();
        break;
      case "longBreak":
        createTimerButtonHandler("longBreakTime")();
        setIsActiveStatusButton("longBreak");
        setStatus("pomodoro");
        dispatch(incrementPomoCount()); // Default Task Count Inc +1
        countTask();
        break;
    }
  };

  useEffect(() => {
    if (isRunning) {
      let timer = duration;
      const interval = setInterval(() => {
        //! setInterval`in bitis suresi. TEST ASAMASINDA SUREYI BURADAN DEGISTIR
        if (--timer <= 0) {
          // Timer Reset
          resetTimer();
          isCatogeryStatus(isStatus); // Task Count 0 != status ? Control Task Count
        } else {
          // Timer Function
          const minutes = parseInt(timer / 60, 10);
          const seconds = parseInt(timer % 60, 10);
          setDuration(timer);
          setMinutes(String(minutes).padStart(2, "0"));
          setSeconds(String(seconds).padStart(2, "0"));
          setTitle(`${activeTask} ${minutes}:${seconds}`);
        }
      }, 1);
      return () => clearInterval(interval);
    }
  }, [duration, isRunning, data]);

  useEffect(() => {
    document.title = title; // Bu kısımda başlığı güncelliyoruz.
  }, [title]);

  useEffect(() => {
    document.body.style.backgroundColor = colorSettings.focusColor;
  }, [colorSettings.focusColor]);

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
    <>
      <div className={TimerStyles.container}>
        <div className={TimerStyles.timer}>
          <div className={TimerStyles.button}>
            <TimerButton
              actived={isActiveStatusButton}
              pomodoroBtn={createTimerButtonHandler("pomodoroTime")}
              shortBreakBtn={createTimerButtonHandler("shortBreakTime")}
              longBreakBtn={createTimerButtonHandler("longBreakTime")}
            />
          </div>
          <div className={TimerStyles.time}>
            {String(currentMinutes).padStart(2, "0")}:
            {String(currentSeconds).padStart(2, "0")}
          </div>
          <div className={TimerStyles.startResetButton}>
            {startResetButtonContent()}
          </div>
        </div>
        <button className={TimerStyles.level} onClick={clearLocalStorage}>
          #{settings.pomoCount}
        </button>
        <div className={TimerStyles.tasksLevel}>{activeTask}</div>
      </div>
    </>
  );
}
