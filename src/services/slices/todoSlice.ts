import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IToDo } from "../../types/types";

type TInitialState = {
  todos: IToDo[];
};

const initialState: TInitialState = {
  todos: [],
};

export const toDoSlice = createSlice({
  name: "todos/state",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<IToDo>) => {
        state.todos.push(action.payload);
      },
      prepare: (todo: IToDo) => {
        const key = Date.now();
        return { payload: { ...todo, id: key } };
      },
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (state, action: PayloadAction<IToDo>) => {
      const newTodo = action.payload;
      state.todos = state.todos.map((todo: IToDo) => {
        return todo.id === newTodo.id ? newTodo : todo;
      });
    },

    checkTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = !todo.status;
      }
    },
  },
  selectors: {
    getTodosSelector: (state) => state.todos,
  },
});

export const { addTodo, removeTodo, updateTodo, checkTodo } = toDoSlice.actions;
export const { getTodosSelector } = toDoSlice.selectors;
