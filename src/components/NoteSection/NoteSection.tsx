import s from './NoteSection.module.scss'
import { Note } from '../Note/Note'
import type { IToDo } from '../../types/types'

interface INoteSection {
  data: IToDo[];
  searchValue: string;
  renderData: IToDo[]
}

export const NoteSection = (props: INoteSection) => {
  const { data, renderData } = props;


  return (
    <ul className={s.note_list}>

      {(renderData ? renderData : data).map((todo) => {
        return <Note
          key={todo.id}
          data={todo}
        />
      })}

    </ul>
  )
}