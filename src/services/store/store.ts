import { configureStore, combineSlices } from "@reduxjs/toolkit";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { toDoSlice } from "../slices/todoSlice";

const rootReducer = combineSlices(toDoSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
