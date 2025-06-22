import s from './SearchSelect.module.scss'
import TriangleIcon from "../../assets/svg/triangle-icon.svg?react"
import { useEffect, useRef, useState } from 'react'

export const SearchSelect = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('ALL')
  const dropDownRef = useRef<HTMLDivElement>(null);

  const buttonHandler = () => setIsVisible(prev => !prev)

  const itemHandler = (value: string) => {
    setButtonText(value)
    setIsVisible(false)
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    }
    if (isVisible) {
      document.addEventListener('mousedown', handleClick);
    }

    return (() => {
      document.removeEventListener('mousedown', handleClick);
    })

  }, [isVisible])

  return (
    <div className={s.dropdownWrapper}
      ref={dropDownRef}
    >

      <button
        type='button'
        className={`${s.dropdown__button} ${isVisible && s.dropdown__button_active}`}
        onClick={buttonHandler}>
        {buttonText}
      </button>

      <ul className={`${s.dropdown__list} ${isVisible && s.dropdown__list_visible}`}>
        <li className={s['dropdown__list-item']} data-value='all' onClick={() => itemHandler('ALL')}>All</li>
        <li className={s['dropdown__list-item']} data-value='complete' onClick={() => itemHandler('Complete')}>Complete</li>
        <li className={s['dropdown__list-item']} data-value='incomplete' onClick={() => itemHandler('Incomplete')}>Incomplete</li>
      </ul>
      {/* <input className={s.input_hidden} type="text" name='select-category' value={buttonText} /> */}
      <TriangleIcon className={`${s.triangle__icon} ${isVisible && s.triangle__icon_up} `} />


    </div>
  )
}


