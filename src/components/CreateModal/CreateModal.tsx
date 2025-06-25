import s from './CreateModal.module.scss'
import { Button } from '../UI/Button/Button'
import { useState, type ChangeEvent, type FormEvent, type Ref } from 'react';
import type { IToDo } from '../../types/types';


interface ICreateModal {
  closeModal: () => void;
  editHandler: (newTodo: IToDo) => void;
  ref: Ref<HTMLDivElement | null>
}

const initialState: IToDo = {
  id: 0,
  title: '',
  status: false
}

export const CreateModal = (props: ICreateModal) => {
  const { closeModal, editHandler, ref } = props;
  const [todo, setTodo] = useState<IToDo>(initialState);

  // создаем заголовок заметки с помощью инпута
  const changeHangler = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    })
  }

  // Добавляем новую заметку в стейт с массивом заметок
  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title } = todo;

    if (title.trim()) {
      editHandler({
        ...todo,
        title,
        id: Date.now()
      })
      closeModal();
    }
  }

  //  Проверяем пустое ли поле инпута через его стейт
  const isActive = Boolean(todo.title.trim())

  return (
    <div className={s.container}>
      <div className={s.modal}
        ref={ref}
      >
        <h2 className={s.modal_title}>New Note</h2>

        <form
          id='edit-form'
          className={s.edit__form}
          onSubmit={handlerSubmit}
        >
          <input
            className={s.edit__form_input}
            type="text"
            name='title'
            onChange={changeHangler}
            value={todo.title}
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
  )
}