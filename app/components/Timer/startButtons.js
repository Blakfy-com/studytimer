import React from "react";

export default function StartButtons({ text, buttonClick, buttonColor }) {
  return (
    <>
      <button onClick={() => buttonClick()}>
        <p style={{ color: buttonColor }}>{text}</p>
      </button>
    </>
  );
}
