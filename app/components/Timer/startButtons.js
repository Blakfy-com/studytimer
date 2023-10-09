import React from "react";
import TimerStyles from "./timer.module.scss";

export default function StartButtons({ text, buttonClick, buttonColor }) {
  return (
    <>
      <button onClick={() => buttonClick()}>
        <p style={{ color: buttonColor }}>{text}</p>
      </button>
    </>
  );
}
