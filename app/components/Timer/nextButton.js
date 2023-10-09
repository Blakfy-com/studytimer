import React from "react";
import TimerStyles from "./timer.module.scss";
import NextSvg from "../icons/next/next";

export default function NextButton({ click, name }) {
  return (
    <>
      <button
        onClick={() => click()}
        name={name}
        className={TimerStyles.resetButton}>
        <NextSvg
          src="/next-verify.png"
          width={50}
          height={50}
          alt="reset-icon"
          name={name}
        />
      </button>
    </>
  );
}
