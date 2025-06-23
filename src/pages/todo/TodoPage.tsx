import s from './todo.module.scss'
import { SearchSection } from '../../components/searchSection/SearchSection'
import { NoteSection } from '../../components/NoteSection/NoteSection'
import { EditButton } from '../../uiKit/EditButton/EditButton'
import type { IToDo } from '../../types/types'
import { useState, type ChangeEvent } from 'react'

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

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
  }

  // кладем отфильтрованный массив Туду в переменную для отображения в списке
  const filteredTodo = todoState.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase().trim()))


  return (
    <main className={s.main}>
      <h1 className={s.title}>TODO LIST</h1>
      <SearchSection searchHandler={searchHandler} />
      <NoteSection
        searchValue={search}
        checkTodo={checkTodo}
        editTodo={editTodo}
        data={todoState}
        deleteTodo={deleteTodo}
        searchData={filteredTodo} />
      <EditButton onClick={openEdit} />
    </main>
  )
}