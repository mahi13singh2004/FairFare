import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectRoute from './components/RedirectRoute'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/signup" element={<RedirectRoute><Signup/></RedirectRoute>}/>
      <Route path="/login" element={<RedirectRoute><Login/></RedirectRoute>}/>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App