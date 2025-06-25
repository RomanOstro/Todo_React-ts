import { useContext } from 'react';
import LoaderImageDay from '../../assets/svg/loader-image-day.svg?react'
import LoaderImageNight from '../../assets/svg/loader-image-night.svg?react'
import s from './Loader.module.scss'
import { ThemeContext } from '../../App';


interface ILoader {
  value: string;
}

export const Loader = (props: ILoader) => {
  const context = useContext(ThemeContext)
  if (!context) return;

  const { theme } = context;
  const isActive = theme === 'light';
  console.log(theme)

  return (
    <>
      {isActive ? <LoaderImageDay className={s.loader} /> :
        <LoaderImageNight className={s.loader} />}
      <p>{props.value}</p>
    </>
  )
}