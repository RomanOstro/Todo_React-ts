import s from './todo.module.scss'
import { SearchSection } from '../../components/searchSection/SearchSection'
import { NoteSection } from '../../components/NoteSection/NoteSection'
import { EditButton } from '../../uiKit/EditButton/EditButton'
import type { ISelectState, IToDo } from '../../types/types'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'

interface IToDoPage {
  openEdit: () => void;
  todoState: IToDo[];
  deleteTodo: (id: number) => void;
  editTodo: (newTodo: IToDo) => void;
  checkTodo: (newTodo: IToDo) => void;
}

export function ToDoPage(p: IToDoPage) {
  const { openEdit, todoState, deleteTodo, editTodo, checkTodo } = p;
  const [search, setSearch] = useState<string>('') // Стейт инпута search
  const [selectVisible, setSelectVisible] = useState<boolean>(false) //состояние открытия дропдауна
  const [selectState, setSelectState] = useState<ISelectState>('ALL') // стейт селекта
  const dropDownRef = useRef<HTMLDivElement>(null); //реф селекта - для реализации закрытия окна по клику вне дропдауна


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


  // Реализация закрытия дропдауна по клику вне дропдауна
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setSelectVisible(false);
      }
    }
    if (selectVisible) {
      document.addEventListener('mousedown', handleClick);
    }

    return (() => {
      document.removeEventListener('mousedown', handleClick);
    })

  }, [selectVisible])

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
      <NoteSection
        renderData={renderData}
        data={todoState}
        searchValue={search}
        checkTodo={checkTodo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
      <EditButton onClick={openEdit} />
    </main>
  )
}