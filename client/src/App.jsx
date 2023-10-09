import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home,About,SingUp,Singin,Profile } from './pages';

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/singup' element={<SingUp/>}/>
      <Route path='/singin' element={<Singin/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App