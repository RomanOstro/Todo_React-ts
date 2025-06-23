import { ToDoPage } from './pages/todo/TodoPage'
import s from './App.module.scss'
import { CreateModal } from './components/CreateModal/CreateModal'
import { useState } from 'react'
import type { IToDo } from './types/types'

export function App() {
  const [create, setCreate] = useState<boolean>(false) //стейт открытия модалки для новой заметки
  const [toDoState, setTodoState] = useState<IToDo[]>([])

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
    setCreate(true)
  }

  const closeModal = () => {
    setCreate(false)
  }

  return (
    <>
      <div className={s.wrapper}>

        {create &&
          <CreateModal
            editHandler={editTodo}
            closeModal={closeModal}

          />}
        <ToDoPage
          openEdit={openModal}
          todoState={toDoState}
          deleteTodo={removeTodo}
          editTodo={updateTodo}
          checkTodo={checkHandler}
        />
      </div>
    </>
  )
}


