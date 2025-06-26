import { useTheme } from '../../../providers/theme-provider';
import LoaderImageDay from '../../../assets/svg/loader-image-day.svg?react'
import LoaderImageNight from '../../../assets/svg/loader-image-night.svg?react'
import s from './Loader.module.scss'


interface ILoader {
  value: string;
}

export const Loader = (props: ILoader) => {
  const { theme } = useTheme()

  const isActive = theme === 'light';

  return (
    <>
      {isActive ? <LoaderImageDay className={s.loader} /> :
        <LoaderImageNight className={s.loader} />}
      <p>{props.value}</p>
    </>
  )
}