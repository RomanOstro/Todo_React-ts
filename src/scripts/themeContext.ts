import { createContext } from "react";
import type { IThemeContext } from "../types/types";

export const ThemeContext = createContext<IThemeContext | null>(null);
