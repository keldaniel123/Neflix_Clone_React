import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Home from './pages/home/home'
import Login from './pages/Login/Login'
import Player from './pages/Player1/Player1'

const RouterHandler = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
      } else {
        navigate('/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/player/:id" element={<Player />} />
    </Routes>
  )
}

export default RouterHandler
