import React, { useState } from "react";

export default function TimerButton({
  pomodoroBtn,
  shortBreakBtn,
  longBreakBtn,
}) {
  const [activeButton, setActiveButton] = useState("pomodoro");

  const buttonLists = [
    {
      id: "pomodoroTime",
      title: "pomodoro",
      name: "Pomodoro",
      clickName: pomodoroBtn,
    },
    {
      id: "shortBreakTime",
      title: "shortBreak",
      name: "Short Break",
      clickName: shortBreakBtn,
    },
    {
      id: "longBreakTime",
      title: "longBreak",
      name: "Long Break",
      clickName: longBreakBtn,
    },
  ];

  return (
    <>
      {buttonLists.map((item) => (
        <button
          id={item.id}
          key={item.title}
          onClick={() => {
            item.clickName();
            setActiveButton(item.title);
          }}
          className={activeButton === item.title ? "activeButton" : null}>
          {item.name}
        </button>
      ))}
    </>
  );
}
