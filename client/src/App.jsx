import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home,About,SignUp,Signin,Profile } from './pages';
import Header from './components/Header';

const App = () => {
  return (
   <BrowserRouter>
   <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App