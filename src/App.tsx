import { ToDoPage } from './pages/todo/TodoPage'
import s from './App.module.scss'
import { CreateModal } from './components/CreateModal/CreateModal'
import { useRef, useState } from 'react'
import type { IToDo } from './types/types'
import { useOutsideClick } from './hooks/useOutsideClick'
import { ThemeProvider } from './providers/theme-provider';



export function App() {

  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false) //стейт открытия модалки для новой заметки
  const createModalRef = useRef<HTMLDivElement | null>(null)
  const [toDoState, setTodoState] = useState<IToDo[]>([]) // стейт для заметок

  // [хук: Закрываем модалку - клик вне модалки]
  useOutsideClick({
    ref: createModalRef,
    visible: createModalIsOpen,
    setVisible: setCreateModalIsOpen
  });

  // функция добавления  заметки в стейт с заметками - toDoState
  const editTodo = (newTodo: IToDo) => {
    setTodoState([
      ...toDoState,
      newTodo
    ])
  }

  // хендлер для чекбокса
  const checkHandler = (checkTodo: IToDo) => {
    setTodoState(toDoState.map((todo) => {
      return todo.id === checkTodo.id ? { ...checkTodo, status: !checkTodo.status } : todo
    }))
  }

  // Редактируем заметку
  const updateTodo = (newTodo: IToDo) => {
    setTodoState(toDoState.map(todo => todo.id === newTodo.id ? newTodo : todo));
  }

  // Удалить заметку
  const removeTodo = (id: number) => {
    const newState = toDoState.filter(todo => todo.id !== id);
    setTodoState(newState)
  }

  const openModal = () => {
    setCreateModalIsOpen(true)
  }

  const closeModal = () => {
    setCreateModalIsOpen(false)
  }

  return (
    <>
      <div className={s.wrapper}>

        {createModalIsOpen &&
          <CreateModal
            ref={createModalRef}
            editHandler={editTodo}
            closeModal={closeModal}

          />}
        <ThemeProvider>
          <ToDoPage
            openEdit={openModal}
            todoState={toDoState}
            deleteTodo={removeTodo}
            editTodo={updateTodo}
            checkTodo={checkHandler}
          />
        </ThemeProvider>
      </div>
    </>
  )
}




