import { ToDoPage } from './pages/todo/TodoPage'
import s from './App.module.scss'
import { CreateModal } from './components/CreateModal/CreateModal'
import { useEffect, useState } from 'react'
import type { ITheme, IToDo } from './types/types'
import { ThemeContext } from './scripts/themeContext'
export { ThemeContext }



export function App() {
  const [theme, setTheme] = useState<ITheme>(() => { // стейт смены темы
    const mode = localStorage.getItem('mode')
    return mode ? JSON.parse(mode) : "light"
  })
  const [create, setCreate] = useState<boolean>(false) //стейт открытия модалки для новой заметки
  const [toDoState, setTodoState] = useState<IToDo[]>([]) // стейт для заметок

  //присваиваем id для боди
  useEffect(() => {
    document.body.id = theme;
  }, [theme])

  // хендлер смены темы (передается через контекст)
  const changeTheme = () => {
    setTheme(prev => {
      const newPrev = prev === "light" ? "dark" : "light"
      localStorage.setItem('mode', JSON.stringify(newPrev))
      return newPrev
    })
  }

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
        <ThemeContext value={{ changeTheme, theme }}>
          <ToDoPage
            openEdit={openModal}
            todoState={toDoState}
            deleteTodo={removeTodo}
            editTodo={updateTodo}
            checkTodo={checkHandler}
          />
        </ThemeContext>
      </div>
    </>
  )
}




