"use client";

import React from "react";
import Header from "./components/Header/header";
import Timer from "./components/Timer/timer";

import AddTask from "./components/Task/addTask";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="flex flex-col items-center">
        <Timer />
        <AddTask />
      </div>
    </div>
  );
}
