import s from './SearchSelect.module.scss'
import TriangleIcon from "../../assets/svg/triangle-icon.svg?react"
import { type Ref } from 'react'
import type { ISelectState } from '../../types/types'

interface ISearchSelect {
  selectHandler: (value: ISelectState) => void
  selectRef: Ref<HTMLDivElement> | null;
  selectVisible: boolean;
  selectState: ISelectState;
  closeSelect: () => void;
}

export const SearchSelect = (props: ISearchSelect) => {
  const { selectHandler, selectRef, selectVisible, selectState, closeSelect } = props;


  return (
    <div className={s.dropdownWrapper}
      ref={selectRef}
    >

      <button
        type='button'
        className={`${s.dropdown__button} ${selectVisible && s.dropdown__button_active}`}
        onClick={closeSelect}>
        {selectState}
      </button>

      <ul className={`${s.dropdown__list} ${selectVisible && s.dropdown__list_visible}`}>
        <li className={s['dropdown__list-item']} onClick={() => selectHandler('ALL')}>All</li>
        <li className={s['dropdown__list-item']} onClick={() => selectHandler('Complete')}>Complete</li>
        <li className={s['dropdown__list-item']} onClick={() => selectHandler('Incomplete')}>Incomplete</li>
      </ul>
      <TriangleIcon className={`${s.triangle__icon} ${selectVisible && s.triangle__icon_up} `} />


    </div>
  )
}


