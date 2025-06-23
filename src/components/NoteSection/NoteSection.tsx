import s from './NoteSection.module.scss'
import { Note } from '../../uiKit/Note/Note'
import type { IToDo } from '../../types/types'

interface INoteSection {
  data: IToDo[]
  deleteTodo: (id: number) => void;
  editTodo: (newTodo: IToDo) => void;
  checkTodo: (newTodo: IToDo) => void;
  searchData: IToDo[]
  searchValue: string;
}

export const NoteSection = (p: INoteSection) => {
  const { data, deleteTodo, editTodo, checkTodo, searchValue, searchData } = p;

  return (
    <ul className={s.note_list}>

      {(searchValue ? searchData : data).map((todo) => {
        return <Note
          editTodo={editTodo}
          key={todo.id}
          data={todo}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
        />
      })}

    </ul>
  )
}