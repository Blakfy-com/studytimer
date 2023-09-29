"use client";
import React from "react";
import TaskCss from "./task.module.scss";
import Image from "next/image";

export default function Task({
  text,
  sessionCount,
  activeSession,
  deleteItem,
}) {
  return (
    <div className={TaskCss.tasks}>
      <div className={TaskCss.tasksText}>
        <Image src="/verify.png" width={30} height={30} alt="verify-icon" />
        <p>{text}</p>
      </div>
      <div className={TaskCss.task}>
        <p>
          {activeSession} / {sessionCount}
        </p>
        <button onClick={() => deleteItem()}>
          <Image src="/trash.png" width={25} height={25} alt="trash-icon" />
        </button>
      </div>
    </div>
  );
}
