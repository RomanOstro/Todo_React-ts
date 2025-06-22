import s from './Note.module.scss'
import EditIcon from '../../assets/svg/edit-icon.svg?react'
import RemoveIcon from '../../assets/svg/remove-icon.svg?react'
import { EditModal } from '../../components/EditModal/EditModal';
import { useState } from 'react';
import type { IToDo } from '../../types/types';


interface TNote {
  data: IToDo;
  deleteTodo: (id: number) => void;
  editTodo: (newTodo: IToDo) => void;
}

export const Note = ({ data, deleteTodo, editTodo }: TNote) => {
  const [edit, setEdit] = useState<boolean>(false) // стейт модалка - редактирование заметки

  const closeEditModal = () => {
    setEdit(false)
  }

  const oOpenEditModal = () => {
    setEdit(true)
  }

  return (
    <>

      <li className={s.note_item}>

        <label className={s.note_item_label}>
          <input
            type="checkbox"
            className={`${s.note_item_checkbox} ${s.visually_hidden}`} />
          <span></span>
          <span className={s.note_item_text}>{data.title}</span>
        </label>

        <div className={s.note_item_controls}>
          <EditIcon className={s.edit_icon} onClick={oOpenEditModal} />
          <RemoveIcon className={s.remove_icon} onClick={() => deleteTodo(data.id)} />
        </div>
        {edit &&
          <EditModal
            data={data}
            closeModal={closeEditModal}
            editHandler={editTodo} />}
      </li>
    </>

  )
}

