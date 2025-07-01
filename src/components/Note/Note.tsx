import s from './Note.module.scss'
import EditIcon from '../../assets/svg/edit-icon.svg?react'
import RemoveIcon from '../../assets/svg/remove-icon.svg?react'
import { EditModal } from '../EditModal/EditModal';
import { useRef, useState } from 'react';
import type { IToDo } from '../../types/types';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useDispatch } from '../../services/store/store';
import { removeTodo, checkTodo } from '../../services/slices/todoSlice';


interface TNoteProps {
  data: IToDo;
}

export const Note = (props: TNoteProps) => {
  const { data } = props;
  const [edit, setEdit] = useState<boolean>(false) // стейт модалка - редактирование заметки
  const modalRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch();


  const handleRemove = (id: number) => {
    dispatch(removeTodo(id))
  }

  const handleCheck = (id: number) => {
    dispatch(checkTodo(id))
  }

  useOutsideClick({
    ref: modalRef,
    visible: edit,
    setVisible: setEdit
  })

  const closeEditModal = () => {
    setEdit(false)
  }

  const oOpenEditModal = () => {
    setEdit(true)
  }

  // Проверка checked
  const isChecked = data.status;

  return (
    <>

      <li className={s.note_item}>

        <label className={s.note_item_label}>
          <input
            type="checkbox"
            className={`${s.note_item_checkbox} ${s.visually_hidden}`}
            onChange={() => handleCheck(data.id)} />
          <span className={`${isChecked && s.note_item_check}`}></span>
          <span className={`${isChecked && s.checked}`}>{data.title}</span>
        </label>

        <div className={s.note_item_controls}>
          <EditIcon className={s.edit_icon} onClick={oOpenEditModal} />
          <RemoveIcon className={s.remove_icon} onClick={() => handleRemove(data.id)} />
        </div>
        {edit &&
          <EditModal
            ref={modalRef}
            data={data}
            closeModal={closeEditModal}
          />}
      </li>
    </>

  )
}

