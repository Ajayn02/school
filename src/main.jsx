import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Contextapi from './context/Contextapi.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Contextapi>
        <App />
      </Contextapi>
    </BrowserRouter>
  </StrictMode>,
)
