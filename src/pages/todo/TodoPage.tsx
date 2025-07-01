import s from './todo.module.scss'
import { SearchSection } from '../../components/searchSection/SearchSection'
import { NoteSection } from '../../components/NoteSection/NoteSection'
import { EditButton } from '../../components/UI/EditButton/EditButton'
import type { ISelectState } from '../../types/types'
import { useRef, useState, type ChangeEvent } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { Loader } from '../../components/UI/Loader/Loader'
import { useSelector } from '../../services/store/store'
import { getTodosSelector } from '../../services/slices/todoSlice'


interface IToDoPage {
  openEdit: () => void;
}

export function ToDoPage(props: IToDoPage) {
  const { openEdit } = props;
  const [search, setSearch] = useState<string>('') // Стейт инпута search
  const [selectVisible, setSelectVisible] = useState<boolean>(false) //состояние открытия дропдауна
  const [selectState, setSelectState] = useState<ISelectState>('ALL') // стейт селекта
  const dropDownRef = useRef<HTMLDivElement | null>(null); //реф селекта - для реализации закрытия окна по клику вне дропдауна
  const todoState = useSelector(getTodosSelector)
  // кастомный хук закрытия, окна по клику Вне
  useOutsideClick({
    ref: dropDownRef,
    visible: selectVisible,
    setVisible: setSelectVisible
  })

  let renderData;

  switch (selectState) {
    case 'ALL':
      renderData = todoState;
      break;
    case 'Complete':
      renderData = todoState.filter((todo) => todo.status);
      break;
    case 'Incomplete':
      renderData = todoState.filter((todo) => !todo.status);
  }

  if (search) {
    const searchData = renderData.filter((todo) => todo.title.toLowerCase().
      includes(search.toLowerCase().trim()))
    renderData = searchData
  }


  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
  }

  const selectHandler = (value: ISelectState) => {
    setSelectState(value)
    setSelectVisible(false)
  }

  const closeSelect = () => setSelectVisible(prev => !prev)

  return (
    <main className={s.main}>
      <h1 className={s.title}>TODO LIST</h1>
      <SearchSection
        closeSelect={closeSelect}
        selectState={selectState}
        selectVisible={selectVisible}
        searchHandler={searchHandler}
        selectHandler={selectHandler}
        selectRef={dropDownRef}

      />
      {todoState.length ?
        <NoteSection
          renderData={renderData}
          data={todoState}
          searchValue={search}
        /> :
        <Loader value={'Empty...'} />}

      <EditButton onClick={openEdit} />
    </main>
  )
}