"use strict";

// Bu kısmı uygulamanızın gereksinimlerine uygun bir şekilde ayarlayın
// Örnek olarak, burada Redux ve local storage kullanımını varsayıyoruz.
import { createSlice } from "@reduxjs/toolkit";

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("timerSetting", serializedState);
  } catch (err) {
    console.error("LocalStorage kaydetme hatası:", err);
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("timerSetting");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("LocalStorage okuma hatası:", err);
    return undefined;
  }
};

// Local Storage'dan initialState'i al
const persistedState = loadStateFromLocalStorage();

export const timerSlice = createSlice({
  name: "timerSetting",
  initialState: persistedState || {
    timerList: [
      { key: 1, name: "Pomodoro", value: 1, max: 100, min: 1 },
      { key: 2, name: "ShortBreak", value: 1, max: 100, min: 1 },
      { key: 3, name: "LongBreak", value: 1, max: 100, min: 1 },
      { key: 4, name: "PomoCounter", value: 1, max: 100, min: 1 },
      {
        key: 5,
        name: "TaskName",
        value: "Burasi taskin header alanidir",
        max: 100,
        min: 1,
      },
      { key: 6, name: "ActiveTimer", value: 1, max: 100, min: 1 },
    ],
  },

  reducers: {
    setPomoTime: (state, action) => {
      state.timerList[0].value = action.payload;
      saveStateToLocalStorage(state);
    },
    setShortBreak: (state, action) => {
      state.timerList[1].value = action.payload;
      saveStateToLocalStorage(state);
    },
    setLongBreak: (state, action) => {
      state.timerList[2].value = action.payload;
      saveStateToLocalStorage(state);
    },
    setPomoCount: (state, action) => {
      state.timerList[3].value = action.payload;
      saveStateToLocalStorage(state);
    },
    setTaskName: (state, action) => {
      state.timerList[4].value = action.payload;
      saveStateToLocalStorage(state);
    },
    setActiveTimer: (state, action) => {
      state.timerList[5].value = action.payload;
      saveStateToLocalStorage(state);
    },
    resetPomoCount: (state, action) => {
      state.timerList[3].value = 1;
      saveStateToLocalStorage(state);
    },
    incPomoCount: (state, action) => {
      state.timerList[3].value = state.timerList[3].value + 1;
      saveStateToLocalStorage(state);
    },
  },
});

export const {
  setTaskName,
  resetPomoCount,
  incPomoCount,
  setPomoTime,
  setShortBreak,
  setLongBreak,
  setActiveTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
