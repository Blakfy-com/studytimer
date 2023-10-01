import { createSlice } from "@reduxjs/toolkit";

// Verilerin başlangıç durumunu tanımlayın
const data = {
  data: [
    {
      key: 1,
      text: "Pomodoro Task Data",
      currentSession: 1,
      totalSessions: 4,
    },
    {
      key: 2,
      text: "Calisma Zamani",
      currentSession: 1,
      totalSessions: 4,
    },
  ],
};

// Veri dilimini oluşturun
export const dataSlice = createSlice({
  name: "dataAnalysis",
  initialState: data,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    deleteData: (state, action) => {
      state.data = state.data.filter(
        (dataItem) => dataItem.key !== action.payload
      );
    },
    updateData: (state, action) => {
      state.data = state.data.map((dataItem) => {
        if (dataItem.id === action.payload.id) {
          return { ...dataItem, ...action.payload };
        }
        return dataItem;
      });
    },
  },
});

// Eylemleri dışa aktarın
export const { addData, deleteData, updateData } = dataSlice.actions;

// Reducer'ı dışa aktarın
export default dataSlice.reducer;
