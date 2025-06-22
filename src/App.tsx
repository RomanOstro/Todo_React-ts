import { ToDoPage } from './pages/todo/TodoPage'
import s from './App.module.scss'
import { CreateModal } from './components/CreateModal/CreateModal'
import { useState } from 'react'
import type { IToDo } from './types/types'

export function App() {
  const [create, setCreate] = useState<boolean>(false) //стейт открытия модалки для новой заметки
  const [toDoState, setTodoState] = useState<IToDo[]>([])


  // функция добавления общей заметки в стейт с заметками - toDoState
  const editTodo = (newTodo: IToDo) => {
    setTodoState([
      ...toDoState,
      newTodo
    ])
  }

  // Редактируем заметку
  const updateTodo = (newTodo: IToDo) => {
    setTodoState(toDoState.map(todo => todo.id === newTodo.id ? newTodo : todo));
  }

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
        />
      </div>
    </>
  )
}


