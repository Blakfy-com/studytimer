"use client";

import React from "react";
import Setting from "./components/Settings/settings";
import Timer from "./components/Timer/timer";

import AddTask from "./components/Task/addTask";

export default function Home() {
  return (
    <div>
      <Setting />

      <div className="flex flex-col items-center">
        <Timer />
        <AddTask />
      </div>
    </div>
  );
}
