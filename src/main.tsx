import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/variables.scss'
import './assets/styles/index.scss'
import { App } from './App.tsx'
import { store } from './services/store.ts'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>

)
