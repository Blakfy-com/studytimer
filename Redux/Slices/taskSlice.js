import { createSlice } from "@reduxjs/toolkit";

// Verilerin başlangıç durumunu tanımlayın
const data = {
  data: [
    {
      key: 1,
      text: "Task 1",
      currentSession: 0,
      totalSessions: 2,
      status: false,
    },
    {
      key: 2,
      text: "Task 2",
      currentSession: 0,
      totalSessions: 4,
      status: false,
    },
    {
      key: 3,
      text: "Task 3",
      currentSession: 0,
      totalSessions: 2,
      status: false,
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
    incTaskCurrent: (state, action) => {
      state.data = state.data.map((dataItem) => {
        if (dataItem.key === action.payload) {
          return {
            ...dataItem,
            currentSession: dataItem.currentSession + 1,
          };
        }
        return dataItem;
      });
      return state; // State'i güncellenmiş haliyle döndürün
    },

    setStatus: (state, action) => {
      state.data = state.data.map((dataItem) => {
        if (dataItem.key === action.payload) {
          return {
            ...dataItem,
            status: dataItem.status ? false : true,
          };
        }
        return dataItem;
      });
      return state; // State'i güncellenmiş haliyle döndürün
    },

    deleteData: (state, action) => {
      state.data = state.data.filter(
        (dataItem) => dataItem.key !== action.payload
      );
    },

    // UPDATE TASK todoList.js icerisine eklenmedi. Eklenecek.
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
export const { addData, incTaskCurrent, setStatus, deleteData, updateData } =
  dataSlice.actions;

// Reducer'ı dışa aktarın
export default dataSlice.reducer;
