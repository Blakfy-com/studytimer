// Store.js
"use client";

import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./Slices/timerSlice";
import taskSlice from "./Slices/taskSlice";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "./localStroge";

const persistedState = loadStateFromLocalStorage();

const reducer = {
  timerSetting: timerReducer,
  dataAnalysis: taskSlice,
};

const store = configureStore({
  reducer,
  devTools: true,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
// store'un default olarak export edilmesi gerekiyor
