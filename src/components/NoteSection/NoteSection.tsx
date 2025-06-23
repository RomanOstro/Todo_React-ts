import s from './NoteSection.module.scss'
import { Note } from '../../uiKit/Note/Note'
import type { IToDo } from '../../types/types'

interface INoteSection {
  data: IToDo[];
  deleteTodo: (id: number) => void;
  editTodo: (newTodo: IToDo) => void;
  checkTodo: (newTodo: IToDo) => void;
  searchValue: string;
  renderData: IToDo[]
}

export const NoteSection = (p: INoteSection) => {
  const { data, deleteTodo, editTodo, checkTodo, renderData } = p;

  return (
    <ul className={s.note_list}>

      {(renderData ? renderData : data).map((todo) => {
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