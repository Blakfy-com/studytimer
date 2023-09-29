import React, { useState } from "react";

export default function TimerButton({
  pomodoroBtn,
  shortBreakBtn,
  longBreakBtn,
}) {
  const [activeButton, setActiveButton] = useState(101);

  const buttonLists = [
    { key: 101, clickName: pomodoroBtn, name: "Pomodoro" },
    { key: 202, clickName: shortBreakBtn, name: "ShortBreak" },
    { key: 303, clickName: longBreakBtn, name: "LongBreak" },
  ];

  return (
    <>
      {buttonLists.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            item.clickName();
            setActiveButton(item.key);
          }}
          className={activeButton === item.key ? "activeButton" : null}>
          {item.name}
        </button>
      ))}
    </>
  );
}
