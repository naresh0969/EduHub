import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {Routes,Route} from 'react-router-dom'
import { AuthProvider } from "./pages/AuthContext";
import ProtectedRoute from './pages/ProtectedRoute';

import './App.css'

import Home from "./pages/Home"
import LoginPage from './pages/LoginPage'
import UserForm from './pages/UserForm'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
      <Routes>
          <Route path='/signin' element={<LoginPage/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/userform"
            element={
              <ProtectedRoute>
                <UserForm />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>
    </>
  )
}

export default App
