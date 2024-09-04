import React, { useContext, useEffect, useRef, useState } from 'react'
import Ct from './Ct'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Edit = () => {
    let obj=useContext(Ct)
    let [data,setData]=useState({"name":"","cat":"","price":"","desc":"","dct":"","pimg":""})
    let [msg,setMsg]=useState("")
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let x=useRef()
    let navigate=useNavigate()
    let fun1=(e)=>{
      setData({...data,"pimg":e.target.files[0]})
    }
    useEffect(()=>{
        setData({...obj.usercon.prod})
    },[])
    let update=()=>{
      let fd=new FormData()
      fd.append('pimg',data['pimg'])
      fd.append("_id",data["_id"])
      axios.put('http://localhost:5000/updimg',fd,{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
        
        setMsg(res.data.msg)
      })
        axios.put("http://localhost:5000/updprod",data,{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
            setMsg(res.data.msg)
            if(res.data.msg=="prod added"){
                setData({"name":"","cat":"","price":"","desc":"","dct":"","pimg":""})
              x.current.value=""
              navigate("/")
              }
        })
    }
  return (
    <div className='formcon'>
      <div className='form'>
        <div className='msg'>{msg}</div>
        {/* <button onClick={updimg}><i class="fa-regular fa-pen-to-square"></i></button> */}
        <input type='file' name="pimg" onChange={fun1} ref={x} />
        <input type='text' placeholder='enter pname' name="name" value={data.name} onChange={fun}/>
        {/* <input type='text' placeholder='enter cat' name="cat" value={data.cat} onChange={fun}/> */}
        <input type='text' placeholder='enter price' name="price" value={data.price} onChange={fun}/>
        <input type='text' placeholder='enter desc' name="desc" value={data.desc} onChange={fun}/>
        <input type='text' placeholder='enter dct' name="dct" value={data.dct} onChange={fun}/>
<button onClick={update}>Update</button>
</div>
</div>
  )
}

export default Edit