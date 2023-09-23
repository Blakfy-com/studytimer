"use client";

import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timerSetting",
  initialState: {
    pomoTime: 25, // time
    shortBreak: 5, // time
    longBreak: 10, // time
    pomoCounter: 5, // Pomo Counter
    taskName: "Burasi taskin header alanidir",
  },

  reducers: {
    setPomoTime: (state, action) => {
      state.pomoTime = action.payload;
    },
    setShortBreak: (state, action) => {
      state.shortBreak = action.payload;
    },
    setLongBreak: (state, action) => {
      state.longBreak = action.payload;
    },
    setActiveTimer: (state, action) => {
      state.activeTimer = action.payload;
    },
    incPomoCount: (state) => {
      state.pomoCounter += 1;
    },
    resetPomoCount: (state) => {
      state.pomoCounter = 1;
    },
    taskName: (state, aciton) => {
      state.taskName = action.payload;
    },
  },
});

export const {
  taskName,
  resetPomoCount,
  incPomoCount,
  setPomoTime,
  setShortBreak,
  setLongBreak,
  setActiveTimer,
} = timerSlice.actions;
export default timerSlice.reducer;
