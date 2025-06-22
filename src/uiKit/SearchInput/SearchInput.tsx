import s from './SearchInput.module.scss';
import SearchIcon from '../../assets/svg/search.svg?react';


export const SearchInput = () => {



  return (
    
      <div className={s.searchInput}>
        <input className={s.input} type="text" placeholder='Search note...' />
      <SearchIcon className={s.searchIcon}/>
      </div>
  )
}