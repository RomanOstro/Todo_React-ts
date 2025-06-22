import { ToDoPage } from './pages/todo/TodoPage'
import s from './App.module.scss'
import { EditModal } from './components/EditModal/EditModal'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { IToDo } from './types/types'

export function App() {
  const [edit, setEdit] = useState<boolean>(false) 
  const [toDoState, setTodoState] = useState<IToDo[]>([])

// функция добавления общей заметки в стейт с заметками - toDoState
  const editTodo = (newTodo: IToDo) => {
    setTodoState([
      ...toDoState,
      newTodo
    ])
  }

  const openEditModal = () => {
    setEdit(true)
  }

  const closeEditModal = () => {
    setEdit(false)
  }

  const removeTodo = (id: number) => {
    const newState = toDoState.filter(todo => todo.id !== id);
    setTodoState(newState)
  }


  return (
    <>
      <div className={s.wrapper}>
        {edit &&
          <EditModal
            editHandler={editTodo}
            closeModal={closeEditModal}
          
          />}
        <ToDoPage 
        openEdit={openEditModal} 
        todoState={toDoState}
        deleteTodo={removeTodo}
        />
      </div>
    </>
  )
}


