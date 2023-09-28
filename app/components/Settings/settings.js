"use client";
import React, { useState } from "react";
import HeaderStyles from "./header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setPomoTime,
  setShortBreak,
  setLongBreak,
} from "../../../Redux/Slices/timerSlice";
import Link from "next/link";

export default function Settings({ settingTask }) {
  return (
    <div className={HeaderStyles.settings}>
      <div>
        <Link href={"/"}>Study Timer</Link>
        <div>
          <button onClick={() => settingTask()}>Settings</button>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}
