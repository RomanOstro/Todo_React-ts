import type { ChangeEvent } from "react"
import { SearchInput } from "../../uiKit/SearchInput/SearchInput"
import { SearchSelect } from "../../uiKit/SearchSelect.tsx/SearchSelect"
import { ThemeButton } from "../../uiKit/ThemeButton/ThemeButton"
import s from './SearchSection.module.scss'

interface ISearchSection {
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchSection = (p: ISearchSection) => {
  const { searchHandler } = p;

  return (
    <form className={s.form}>
      <SearchInput searchHandler={searchHandler} />
      <SearchSelect />
      <ThemeButton />
    </form>
  )

}