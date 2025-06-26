import IconDay from '../../../assets/icons/day.svg?react'
import IconNight from '../../../assets/icons/night.svg?react'
import { useTheme } from '../../../providers/theme-provider'
import s from './ThemeButton.module.scss'


export const ThemeButton = () => {
  const { theme, changeTheme } = useTheme();

  const isActive = theme === "light"

  return (
    <>
      <button type='button' className={s.theme_button} onClick={changeTheme}>
        <IconDay className={`${s.theme_button_icon_day} ${isActive && s.active}`} />
        <IconNight className={`${s.theme_button_icon_day} ${!isActive && s.active}`} />
      </button>
    </>
  )
}