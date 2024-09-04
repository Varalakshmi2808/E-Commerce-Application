import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reg = () => {
    let [data,setData]=useState({"_id":"","name":"","place":"","phno":"","pwd":""})
    let [msg,setmsg]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let reg=()=>{
        axios.post("http://localhost:5000/reg",data).then((res)=>{
            setmsg(res.data.msg)
            navigate("/login")
        })
    }
    return (
    <div className='formcon'>
        <div className='form'>
            <div className='h'>Registration</div>
        <input type='text' placeholder='enter e-mail' value={data._id} onChange={fun} name="_id"/>
            <input type='text' placeholder='enter name' value={data.name} onChange={fun} name="name"/>
            <input type='text' placeholder='enter place' value={data.place} onChange={fun} name="place"/>
            <input type='text' placeholder='enter phno' value={data.phno} onChange={fun} name="phno"/>
            <input type='password' placeholder='enter password' value={data.pwd} onChange={fun} name="pwd"/>
            <button onClick={reg} className='in'>Register</button>
            <div>{msg}</div>
        </div>
    </div>
  )
}

export default Reg