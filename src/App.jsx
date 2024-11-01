import Landing from './pages/Landing'
import { useContext } from 'react'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import { Routes,Route } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import { logoutContext } from './context/Contextapi';
import './App.css'
import './bootstrap.min.css'

function App() {
  const {logoutResponse}=useContext(logoutContext)
  

  return (
    <>
    
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/dash' element={logoutResponse?<Dashboard/>:<Auth/>} />
    </Routes>
    <Toaster/>
    
    </>
  )
}

export default App
