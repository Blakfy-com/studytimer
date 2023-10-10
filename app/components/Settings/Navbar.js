"use client";
import React from "react";
import HeaderStyles from "./header.module.scss";
import Link from "next/link";

export default function Navbar({ settingTask }) {
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
