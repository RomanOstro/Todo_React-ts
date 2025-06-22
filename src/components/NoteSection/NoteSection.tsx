import s from './NoteSection.module.scss'
import { Note } from '../../uiKit/Note/Note'
import type { IToDo } from '../../types/types'

interface INoteSection {
  data: IToDo[]
  deleteTodo: (id:number) => void;
}

export const NoteSection = (p: INoteSection) => {
  const { data, deleteTodo } = p;

  return (
    <ul className={s.note_list}>
      {data.map((todo) => {
        return <Note 
        key={todo.id} 
        value={todo.title} 
        id={todo.id}
        deleteTodo={deleteTodo}/>
      })}
    </ul>
  )
}