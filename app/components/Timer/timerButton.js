import React, { useEffect, useState } from "react";

export default function TimerButton({
  actived,
  pomodoroBtn,
  shortBreakBtn,
  longBreakBtn,
}) {
  const [activeButton, setActiveButton] = useState("pomodoro");

  const buttonLists = [
    {
      id: "pomodoroTime",
      title: "pomodoro",
      name: "Focus Time", // Display Name
      clickName: pomodoroBtn,
    },
    {
      id: "shortBreakTime",
      title: "shortBreak",
      name: "Short Break", // Display Name
      clickName: shortBreakBtn,
    },
    {
      id: "longBreakTime",
      title: "longBreak",
      name: "Long Break", // Display Name
      clickName: longBreakBtn,
    },
  ];



  useEffect(() => {
    actived !== null ? setActiveButton(actived) : activeButton;
  }, [actived, activeButton]);

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
