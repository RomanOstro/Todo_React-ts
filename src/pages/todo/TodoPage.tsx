import s from './todo.module.scss'
import { SearchSection } from '../../components/searchSection/SearchSection'
import { NoteSection } from '../../components/NoteSection/NoteSection'
import { EditButton } from '../../uiKit/EditButton/EditButton'
import type { IToDo } from '../../types/types'

interface IToDoPage {
  openEdit: () => void;
  todoState: IToDo[];
  deleteTodo: (id: number) => void;
  editTodo: (newTodo: IToDo) => void;
}

export function ToDoPage(p: IToDoPage) {
  const { openEdit, todoState, deleteTodo, editTodo } = p;



  return (
    <main className={s.main}>
      <h1 className={s.title}>TODO LIST</h1>
      <SearchSection />
      <NoteSection editTodo={editTodo} data={todoState} deleteTodo={deleteTodo} />
      <EditButton onClick={openEdit} />
    </main>
  )
}