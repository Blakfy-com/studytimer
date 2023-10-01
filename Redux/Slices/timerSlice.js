import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timerSetting",
  initialState: {
    settings: {
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
      pomoCount: 1,
      activeTask: "",
      activeTimer: 2,
    },
  },
  reducers: {
    setTimerSettings: (state, action) => {
      const { settingName, value } = action.payload;
      state.settings[settingName] = value;
    },
    resetPomoCount: (state) => {
      state.settings.pomoCount = 0;
    },
    incrementPomoCount: (state) => {
      state.settings.pomoCount += 1;
    },
  },
});

export const { setTimerSettings, resetPomoCount, incrementPomoCount } =
  timerSlice.actions;

export default timerSlice.reducer;
