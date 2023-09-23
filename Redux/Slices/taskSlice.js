"use client";

import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "pomodoroTodoList",
  initialState: {
    todoLists: [
      { key: 1, text: "javascript", currentSession: 3, totalSessions: 4 },
    ],
  },

  reducers: {
    addTodo: (state, action) => {
      state.todoLists.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todoLists = state.todoLists.filter(
        (todo) => todo.key !== action.payload
      );
    },
    // Current Session Arttirmak ve azaltma fonksiyonlari Duzenlenecek. Calisip Calismadigini bilmiyorum.
    increment: (state, action) => {
      state.todoLists = state.todoLists.map((todo) => {
        if (todo.key === action.payload) {
          return { ...todo, currentSession: todo.currentSession + 1 };
        }
        return todo;
      });
    },
    // Azaltma islemi muhtemelen olmayacak ancak simdilik dursun.
    // decrement: (state, action) => {
    //   state.todoLists = state.todoLists.map((todo) => {
    //     if (todo.key === action.payload) {
    //       return { ...todo, currentSession: todo.currentSession - 1 };
    //     }
    //     return todo;
    //   });
    // },
  },
});

export const { addTodo, deleteTodo } = taskSlice.actions;
export default taskSlice.reducer;
