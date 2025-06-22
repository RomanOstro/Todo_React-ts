import IconDay from '../../assets/icons/day.svg?react'
import IconNight from '../../assets/icons/night.svg?react'
import s from './ThemeButton.module.scss'

interface TThemeButton {
  isActive: boolean;
  onClick: () => void;
}

export const ThemeButton = ({ isActive = true }: TThemeButton) => {

 
  return (
    <>
      <button type='button' className={s.theme_button} >
        <IconDay className={`${s.theme_button_icon_day} ${isActive && s.active}`} />
        <IconNight className={`${s.theme_button_icon_day} ${!isActive && s.active}`} />
      </button>

    </>
  )
}