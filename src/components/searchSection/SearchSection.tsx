import { SearchInput } from "../../uiKit/SearchInput/SearchInput"
import { SearchSelect } from "../../uiKit/SearchSelect.tsx/SearchSelect"
import { ThemeButton } from "../../uiKit/ThemeButton/ThemeButton"
import s from './SearchSection.module.scss'

export const SearchSection = () => {
  return (
    <form className={s.form}>
      <SearchInput />
      <SearchSelect />
      <ThemeButton/>
    </form>
  )

}