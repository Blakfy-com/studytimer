// Store.js
"use client";

import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "./Slices/timerSlice";
import taskSlice from "./Slices/taskSlice";

const reducer = {
  timerSetting: timerSlice,
  pomodoroTodoList: taskSlice,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
// store'un default olarak export edilmesi gerekiyor
