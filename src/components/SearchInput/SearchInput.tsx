import s from './SearchInput.module.scss';
import SearchIcon from '../../assets/svg/search.svg?react';
import { type ChangeEvent } from 'react';

interface ISearchInput {
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = (props: ISearchInput) => {

  const { searchHandler } = props;


  return (

    <div className={s.searchInput}>
      <input className={s.input} type="text" placeholder='Search note...' onChange={searchHandler} />
      <SearchIcon className={s.searchIcon} />
    </div>
  )
}