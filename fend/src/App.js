import React, { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './Nav'
import Home from './components/Home'
import Reg from './components/Reg'
import Login from './components/Login'
import Logout from './components/Logout'
import Cart from './components/Cart'
import Add from './components/Add'
import Ct from './components/Ct'
import Profile from './components/Profile'
import Km from './components/Km'
import Edit from './components/Edit'
import Search from './components/Search'
import Order from './components/Order'



const App = () => {
  let [usercon,setUsercon]=useState({"token":"","name":"","_id":"","role":"","items":[]})
  let updcon=(item)=>{
    setUsercon({...usercon,...item})
  }
  let obj={"usercon":usercon,"updcon":updcon}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/reg' element={<Reg/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Add' element={<Add/>}/>
      <Route path='/km' element={<Km/>}/>
      <Route path='/edit' element={<Edit/>}/>
      <Route path="/order" element={<Order/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
    {/* <Footer/> */}
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App