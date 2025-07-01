import s from './CreateModal.module.scss'
import { Button } from '../UI/Button/Button'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type Ref } from 'react';
import type { IToDo } from '../../types/types';
import { useDispatch } from '../../services/store/store';
import { addTodo } from '../../services/slices/todoSlice';


interface ICreateModal {
  closeModal: () => void;
  ref: Ref<HTMLDivElement | null>
}

const initialState: IToDo = {
  id: 0,
  title: '',
  status: false
}

export const CreateModal = (props: ICreateModal) => {
  const dispatch = useDispatch();

  const { closeModal, ref } = props;
  const [todo, setTodo] = useState<IToDo>(initialState);

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [ref])


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
      dispatch(addTodo({
        ...todo,
        title,
      }))
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
            ref={inputRef}
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