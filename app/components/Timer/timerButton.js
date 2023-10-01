import React, { useState } from "react";

export default function TimerButton({
  pomodoroBtn,
  shortBreakBtn,
  longBreakBtn,
}) {
  const [activeButton, setActiveButton] = useState(101);

  const buttonLists = [
    { key: 101, clickName: pomodoroBtn, name: "Pomodoro", title: "Pomodoro" },
    {
      key: 202,
      clickName: shortBreakBtn,
      name: "ShortBreak",
      title: "Short Break",
    },
    {
      key: 303,
      clickName: longBreakBtn,
      name: "LongBreak",
      title: "Long Break",
    },
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
          {item.title}
        </button>
      ))}
    </>
  );
}
