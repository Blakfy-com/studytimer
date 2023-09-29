"use client";
// Local Storage'da veriyi kaydetmek için işlev
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("pomodoroTodoList", serializedState);
  } catch (err) {
    console.error("LocalStorage kaydetme hatası:", err);
  }
};

// Redux slice içerisinde, initialState'i yükleme işlevini çağırmadan önce localStorage'dan alınan veri ile değiştirin.
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("pomodoroTodoList");
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

export const taskSlice = createSlice({
  name: "pomodoroTodoList",
  initialState: persistedState || {
    todoLists: [],
  },

  reducers: {
    addTodo: (state, action) => {
      state.todoLists.push(action.payload);
      saveStateToLocalStorage(state);
    },
    deleteTodo: (state, action) => {
      state.todoLists = state.todoLists.filter(
        (todo) => todo.key !== action.payload
      );
      saveStateToLocalStorage(state);
    },
    // Current Session Arttirmak ve azaltma fonksiyonlari Duzenlenecek. Calisip Calismadigini bilmiyorum.
    increment: (state, action) => {
      state.todoLists = state.todoLists.map((todo) => {
        if (todo.key === action.payload) {
          return { ...todo, currentSession: todo.currentSession + 1 };
        }
        return todo;
      });
      saveStateToLocalStorage(state);
    },
  },
});

export const { addTodo, deleteTodo } = taskSlice.actions;
export default taskSlice.reducer;
