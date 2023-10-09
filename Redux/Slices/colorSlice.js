import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
  name: "colorSettings",
  initialState: {
    colorSettings: {
      focusColor: "#ba4949",
      shortBreakColor: "#7D53A2",
      longBreakColor: "#545764",
    },
  },
  reducers: {
    setColors: (state, action) => {
      const { settingName, value } = action.payload;
      state.colorSettings[settingName] = value;
    },
  },
});

export const { setColors } = colorSlice.actions;

export default colorSlice.reducer;
