import { createContext, useContext, useEffect, useState, type FC, type PropsWithChildren } from "react";
import type { ITheme, IThemeContext } from "../types/types";

// Провайдер смены темы
const ThemeContext = createContext<IThemeContext | null>(null);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {

  const [theme, setTheme] = useState<ITheme>(() => {
    const mode = localStorage.getItem('mode');
    return mode ? JSON.parse(mode) : "light"
  })

  const changeTheme = () => {
    setTheme((prev) => {
      const themeStorage = prev === "light" ? "dark" : "light";
      localStorage.setItem('mode', JSON.stringify(themeStorage));
      return themeStorage
    })
  }

  useEffect(() => {
    document.body.id = theme
  }, [theme])

  return (
    <ThemeContext value={{ theme, changeTheme }}>
      {children}
    </ThemeContext>
  )
}

// Делаем проверку, что бы избежать дублирования кода, т.к. по типам контекста у нас <IThemeContext | null>, 
// Можно будет переделать типы, передавая initialValue в createContext. 
export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('ThemeContext отсутствует')
  }
  return context;
}