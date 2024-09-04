import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Ct from './Ct'
import axios from 'axios'
const Profile = () => {
    let obj=useContext(Ct)
    let [user,setUser]=useState({})
    let navigate=useNavigate()
    useEffect(()=>{
        if(obj.usercon.token==""){
            navigate("/")
        }
        else{
        axios.get(`http://localhost:5000/getuser/${obj.usercon._id}`,{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
            setUser(res.data)
        })
    }
    },[])
  return (
    <div style={{display:'flex'}}>
      {obj.usercon.sidebar==true&&<div id='menu' style={{width:'15%'}}>
        {obj.usercon.token==""&&<Link to='/login'>Login</Link>}
          {obj.usercon.token==""&&<Link to='/reg'>Register</Link>}
          {obj.usercon.token!=""&&obj.usercon.role=='admin'&&<Link to='/add'>AddItem</Link>}
          {obj.usercon.token!=""&&<Link to='/profile'>Profile</Link>}
          {obj.usercon.token!=""&&<Link to='/logout'>Logout</Link>}
      </div>}
        <div className='prof'>
        <i class="fa-solid fa-user" style={{fontSize:'80px'}}></i>
        <p><span>Name : </span>{user.name}</p>
        <p><span>Place : </span>{user.place}</p>
        <p><span>Phone : </span>{user.phno}</p>
        <p><span>Role : </span>{user.role}</p>
        </div>
        {/* <Outlet/> */}
    </div>
  )
}

export default Profile