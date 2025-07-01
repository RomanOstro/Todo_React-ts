import { ToDoPage } from './pages/todo/TodoPage'
import s from './App.module.scss'
import { CreateModal } from './components/CreateModal/CreateModal'
import { useRef, useState } from 'react'
import { useOutsideClick } from './hooks/useOutsideClick'
import { ThemeProvider } from './providers/theme-provider';



export function App() {
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false) //стейт открытия модалки для новой заметки
  const createModalRef = useRef<HTMLDivElement | null>(null)

  // [хук: Закрываем модалку - клик вне модалки]
  useOutsideClick({
    ref: createModalRef,
    visible: createModalIsOpen,
    setVisible: setCreateModalIsOpen
  });

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
            closeModal={closeModal}

          />}
        <ThemeProvider>
          <ToDoPage
            openEdit={openModal}
          />
        </ThemeProvider>
      </div>
    </>
  )
}




