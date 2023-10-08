import { createSlice } from "@reduxjs/toolkit";

// Verilerin başlangıç durumunu tanımlayın
const data = {
  data: [
    {
      key: 0,
      text: "Calisma Zamani 0",
      currentSession: 0,
      totalSessions: 2,
      status: false,
      active: false,
    },
    {
      key: 1,
      text: "Calisma Zamani 1",
      currentSession: 0,
      totalSessions: 2,
      status: false,
      active: false,
    },
  ],
  todoCount: 0,
};

// Veri dilimini oluşturun
export const dataSlice = createSlice({
  name: "dataAnalysis",
  initialState: data,
  reducers: {
    incTask: (state) => {
      state.todoCount++;
    },
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
            status: !dataItem.status,
          };
        }
        return dataItem;
      });
      return state; // State'i güncellenmiş haliyle döndürün
    },

    setActive: (state, action) => {
      state.data = state.data.map((dataItem) => {
        if (dataItem.key === action.payload) {
          return {
            ...dataItem,
            active: !dataItem.active,
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
export const {
  incTask,
  addData,
  incTaskCurrent,
  setStatus,
  setActive,
  deleteData,
  updateData,
} = dataSlice.actions;

// Reducer'ı dışa aktarın
export default dataSlice.reducer;
