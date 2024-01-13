import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home,About,SignUp,Signin,Profile, CreateListing, UpdateListing } from './pages';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Listing from './pages/Listing';

const App = () => {
  return (
   <BrowserRouter>
   <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path="/listing/:listingId" element={<Listing/>} />
      <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />}  /> 
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App