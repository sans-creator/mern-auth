import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import EmailVerify from './pages/EmailVerify'
import Login from './pages/Login'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>

      </Routes>
      
    </div>
  )
}

export default App
