import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Cart = () => {
  let [data,setData]=useState([])
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let [f,setf]=useState(true)
  let [ctotal,setCtotal]=useState(0)
  useEffect(()=>{
    if(Cookies.get('token')==undefined){
      navigate("/login")
    }
    else{
    axios.get(`http://localhost:5000/getcart/${obj.usercon._id}`,{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
      setData(res.data)
      console.log(res.data)
      let t=0
      for(let item of res.data){
        console.log("sdas")
        t=t+(item.price*(100-item.dct)/100)*item.qty
      }
      setCtotal(t)
      console.log(ctotal)
    })
  }
  },[f])
  let delcart=(item)=>{
    axios.delete(`http://localhost:5000/delcart/${item._id}`,{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
      console.log(res.data.msg)
      setf(f=>!f)
    })
  }

  let inc=(id)=>{
    axios.put("http://localhost:5000/incqty",{"_id":id},{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
      setf(f=>!f)
    })
  }
  let dec=(id,qty)=>{
    if(qty>1){
    axios.put("http://localhost:5000/decqty",{"_id":id},{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
      setf(f=>!f)
    })
  }
  else{
    delcart(id)
  }
  }

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <div className='msg'><span>Cart Total : </span>{ctotal} 
      <span> | Total items : </span>{data.length}
      </div>
    <div className='postcon'>
      {
      data.map((item)=>{
        return(
          <div className='post'>
                <div className='img'><img src={`http://localhost:5000/imgs/${item.pimg}`}/></div>
                <p><span>Name:</span>{item.name}</p>
                <p><span>Price:</span>{item.price}</p>
                <p><span>Description:</span>{item.desc}</p>
                <p><span>Discount:</span>{item.dct}</p>
                <div style={{width:'80%',display:'flex',justifyContent:'space-evenly',gap:"10px"}}>
                  <button onClick={()=>{dec(item._id,item.qty)}} className='btn'>-</button>
                <div><span>Quantity:</span>{item.qty}</div>
                <button onClick={()=>{inc(item._id)}} className='btn'>+</button>
                </div>
                <div style={{textDecoration:'line-through'}}><span>Total:</span>{item.price*item.qty}</div>
                <hr style={{border:'1px solid yellow',width:'100%'}}></hr>
                <p><span>After discount:</span>{(item.price*(100-item.dct)/100)*item.qty}</p>
                <button onClick={()=>delcart(item)} className='btn'>Remove from cart</button>
                </div>
        )
      })
    }
    </div>
    </div>
  )
}

export default Cart