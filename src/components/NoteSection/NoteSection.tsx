import s from './NoteSection.module.scss'
import { Note } from '../../uiKit/Note/Note'
import type { IToDo } from '../../types/types'

interface INoteSection {
  data: IToDo[]
  deleteTodo: (id: number) => void;
  editTodo: (newTodo: IToDo) => void;
}

export const NoteSection = (p: INoteSection) => {
  const { data, deleteTodo, editTodo } = p;

  return (
    <ul className={s.note_list}>
      {data.map((todo) => {
        return <Note
          editTodo={editTodo}
          key={todo.id}
          data={todo}
          deleteTodo={deleteTodo}
        />
      })}
    </ul>
  )
}