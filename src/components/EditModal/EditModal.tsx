import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type Ref } from 'react';
import type { IToDo } from '../../types/types';
import s from './EditModal.module.scss';
import { createPortal } from 'react-dom';
import { Button } from '../UI/Button/Button';
import { useDispatch } from '../../services/store/store';
import { updateTodo } from '../../services/slices/todoSlice';

interface IEditModal {
  data: IToDo;
  closeModal: () => void;
  ref: Ref<HTMLDivElement | null>
}

// Получаем Dom-элемент в который будем рендерить модалку
const modalRoot = document.querySelector('#react-modals')

export const EditModal = (props: IEditModal) => {
  const dispatch = useDispatch()
  const { closeModal, data, ref } = props;
  const [newTitle, setTitle] = useState<IToDo>(data)

  const inputRef = useRef<HTMLInputElement | null>(null)


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [ref])

  // создаем заголовок заметки с помощью инпута
  const changeHangler = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setTitle({
      ...newTitle,
      [name]: value,
    })
  }

  // Сабмитим изменения в заметке
  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title } = newTitle;

    if (title.trim()) {
      dispatch(updateTodo({
        ...newTitle,
        title
      }))
      // editHandler({
      //   ...newTitle,
      //   title
      // })
      closeModal();
    }
  }

  //  Проверяем пустое ли поле инпута через его стейт
  const isActive = Boolean(newTitle.title.trim())

  return createPortal((
    <div className={s.container}>
      <div ref={ref} className={s.modal}>
        <h2 className={s.modal_title}>Edit Note</h2>

        <form
          id='edit-form'
          className={s.edit__form}
          onSubmit={handlerSubmit}
        >
          <input
            ref={inputRef}
            className={s.edit__form_input}
            type="text"
            name='title'
            onChange={changeHangler}
            value={newTitle.title}
          />
        </form>

        <div className={s.modal_button_section}>
          <Button
            type='button'
            className={s.cansel_button}
            text='Cancel'
            onClick={closeModal}
          />
          <Button className={`${s.submit_button} ${!isActive && s.not_active}`}
            text='Apply'
            type='submit'
            form='edit-form'
          />
        </div>
      </div>

    </div>
  ),
    modalRoot as HTMLDivElement); // указываем куда будем рендерить модалку
};
