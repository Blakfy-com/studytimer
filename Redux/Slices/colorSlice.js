import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
  name: "colorSettings",
  initialState: {
    colorSettings: {
      focusColor: "#7D53A2",
      shortBreakColor: "#545764",
      longBreakColor: "#af4e91",
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
