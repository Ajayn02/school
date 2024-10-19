import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import './bootstrap.min.css'

function App() {

  return (
    <>
    
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/dash' element={<Dashboard/>} />
    </Routes>
    
    </>
  )
}

export default App
