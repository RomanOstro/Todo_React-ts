import type { ChangeEvent, Ref } from "react"
import { SearchInput } from "../SearchInput/SearchInput"
import { SearchSelect } from "../SearchSelect.tsx/SearchSelect"
import { ThemeButton } from "../UI/ThemeButton/ThemeButton"
import s from './SearchSection.module.scss'
import type { ISelectState } from "../../types/types"

interface ISearchSection {
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void
  selectHandler: (value: ISelectState) => void
  selectRef: Ref<HTMLDivElement> | null;
  selectVisible: boolean;
  selectState: ISelectState;
  closeSelect: () => void;
}

export const SearchSection = (props: ISearchSection) => {
  const { searchHandler, selectRef, selectHandler, selectVisible, selectState, closeSelect } = props;

  return (
    <form className={s.form}>
      <SearchInput searchHandler={searchHandler} />
      <SearchSelect
        closeSelect={closeSelect}
        selectState={selectState}
        selectVisible={selectVisible}
        selectHandler={selectHandler}
        selectRef={selectRef} />
      <ThemeButton />
    </form>
  )

}