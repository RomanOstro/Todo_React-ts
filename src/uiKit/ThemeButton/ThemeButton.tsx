import { useContext } from 'react';
import IconDay from '../../assets/icons/day.svg?react'
import IconNight from '../../assets/icons/night.svg?react'
import s from './ThemeButton.module.scss'
import { ThemeContext } from '../../App';


export const ThemeButton = () => {
  const context = useContext(ThemeContext)
  if (!context) return;

  const { theme, changeTheme } = context;
  const isActive = theme === 'light';

  return (
    <>
      <button type='button' className={s.theme_button} onClick={changeTheme}>
        <IconDay className={`${s.theme_button_icon_day} ${isActive && s.active}`} />
        <IconNight className={`${s.theme_button_icon_day} ${!isActive && s.active}`} />
      </button>
    </>
  )
}