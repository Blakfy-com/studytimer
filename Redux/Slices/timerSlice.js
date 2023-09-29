"use client";

import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timerSetting",
  initialState: {
    pomoTime: 1, // time
    shortBreak: 1, // time
    longBreak: 1, // time
    pomoCounter: 1, // Pomo Counter
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
