"use client";

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("timerSetting", serializedState);
  } catch (err) {
    console.error("LocalStorage kaydetme hatası:", err);
  }
};

// Redux slice içerisinde, initialState'i yükleme işlevini çağırmadan önce localStorage'dan alınan veri ile değiştirin.
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("timerSetting");
    if (serializedState === null) {
      return undefined; // Eğer kayıtlı veri yoksa, undefined döndürün
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("LocalStorage okuma hatası:", err);
    return undefined;
  }
};
import { createSlice } from "@reduxjs/toolkit";

// Local Storage'dan initialState'i al
const persistedState = loadStateFromLocalStorage();

export const timerSlice = createSlice({
  name: "timerSetting",
  initialState: persistedState || {
    pomoTime: 1, // time
    shortBreak: 1, // time
    longBreak: 1, // time
    pomoCounter: 1, // Pomo Counter
    taskName: "Burasi taskin header alanidir",
  },

  reducers: {
    setPomoTime: (state, action) => {
      state.pomoTime = action.payload;
      saveStateToLocalStorage(state);
    },
    setShortBreak: (state, action) => {
      state.shortBreak = action.payload;
      saveStateToLocalStorage(state);
    },
    setLongBreak: (state, action) => {
      state.longBreak = action.payload;
      saveStateToLocalStorage(state);
    },
    setActiveTimer: (state, action) => {
      state.activeTimer = action.payload;
      saveStateToLocalStorage(state);
    },
    incPomoCount: (state) => {
      state.pomoCounter += 1;
      saveStateToLocalStorage(state);
    },
    resetPomoCount: (state) => {
      state.pomoCounter = 1;
      saveStateToLocalStorage(state);
    },
    taskName: (state, aciton) => {
      state.taskName = action.payload;
      saveStateToLocalStorage(state);
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
