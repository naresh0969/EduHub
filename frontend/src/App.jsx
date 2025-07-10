import { useState } from 'react'

import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
// import SignIn from './pages/SignIn'
import LoginPage from './pages/LoginPage'
import UserForm from './pages/UserForm'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/signin' element={<LoginPage/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/userform' element={<UserForm/>}></Route>
      </Routes>
    </>
  )
}

export default App
