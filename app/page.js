"use client";

import React from "react";
import Header from "./components/Header/header";
import Timer from "./components/Timer/timer";

import AddTask from "./components/Task/addTask";
import BeforeTask from "./components/Task/beforeTask";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="flex flex-col items-center">
        <Timer />

        {/* ADD TASK */}
        <div className="text-center h-full w-[600px] ">
          <BeforeTask pomoNumber={"1/4"} name={1} />
          <AddTask />
        </div>
      </div>
    </div>
  );
}
