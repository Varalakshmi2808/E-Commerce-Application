import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import {Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
    let [data,setData]=useState({"_id":"","pwd":"","token":""})
    let [msg,setmsg]=useState("")
    let obj=useContext(Ct)
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
      obj.updcon({"sidebar":!obj.usercon.sidebar})
    },[])
    let login=()=>{
        axios.post("http://localhost:5000/login",data).then((res)=>{
          if(res.data.token==undefined){
          setmsg(res.data.msg)
          }
          else{
            obj.updcon(res.data)
            Cookies.set("token",res.data.token)
            navigate("/")
          }
        })
    }
  return (
    <div style={{display:'flex'}}>
      {obj.usercon.sidebar==true&&<div id='menu' style={{width:'15%'}}>
        {obj.usercon.token==""&&<Link to='/login'>Login</Link>}
          {obj.usercon.token==""&&<Link to='/reg'>Register</Link>}
          {obj.usercon.token!=""&&obj.usercon.role=='admin'&&<Link to='/add'>AddItem</Link>}
          {obj.usercon.token!=""&&<Link to='/profile'>Profile</Link>}
          {obj.usercon.token!=""&&<Link to='logout'>Logout<i class="fa-solid fa-right-from-bracket"></i></Link>}
      </div>}
    <div className='formcon'>
        <div className='form'>
          <div className='h'>Login</div>
            <input type='text' placeholder='enter mail' value={data._id} onChange={fun} name='_id'/>
            <input type='password' name='pwd' onChange={fun} value={data.pwd} placeholder='password'/>
            <button onClick={login} className='in'>Login</button>
            <div>{msg}</div>
        </div>
        </div>
    </div>
  )
}

export default Login