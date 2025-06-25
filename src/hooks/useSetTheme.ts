import { useEffect, useState } from "react"
import type { ITheme } from "../types/types"


export const useSetTheme = ():[theme: ITheme, changeTheme:() => void ] => {
    const [theme, setTheme] = useState<ITheme>(() => { // стейт смены темы
      const mode = localStorage.getItem('mode')
      return mode ? JSON.parse(mode) : "light"
    })

      //присваиваем id для боди
  useEffect(() => {
    document.body.id = theme;
  }, [theme])

    // хендлер смены темы (передается через контекст)
  const changeTheme = () => {
    setTheme(prev => {
      const newPrev = prev === "light" ? "dark" : "light"
      localStorage.setItem('mode', JSON.stringify(newPrev))
      return newPrev
    })
  }

  return [theme, changeTheme]
}