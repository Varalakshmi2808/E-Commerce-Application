import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import { Link, useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { yellow } from '@mui/material/colors';
import Cookies from 'js-cookie'

const Home = () => {
  let [prod,setProd]=useState([])
  let [f,setF]=useState(true)
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    axios.get("http://localhost:5000/getprod").then((res)=>{
      setProd(res.data)
      obj.updcon({"sidebar":false})
    })
  },[f])
  let del=(item)=>{
    axios.delete(`http://localhost:5000/delprod/${item._id}/${item.pimg}`,{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
      setF((f)=>(!f))
      console.log(res.data.msg)
    })
  }
  let updprod=(item)=>{
    obj.updcon({"prod":item})
    navigate("/edit")
  }

  let addcart=(item)=>{
    if(Cookies.get('token')==""){
      alert("login to add to cart")
    }
    else{
    axios.post("http://localhost:5000/addcart",{...item,"qty":1,"uid":obj.usercon._id,"pid":item._id},{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
      alert(res.data.msg)
    })
  }
  }
  let knowmore=(it)=>{
    obj.updcon({"prod":it})
    navigate("/km")
  }

  let buynow=()=>{
    if(obj.usercon.token==""){
      navigate("/login")
    }
    else{
      console.log(obj.usercon._id)
      axios.get(`http://localhost:5000/buy/${obj.usercon._id}`).then((res)=>{
        navigate("/order")
        console.log(res.data.msg)
      })
    }
  }

  return (<div style={{display:'flex'}}>
    {obj.usercon.sidebar==true&&<div id='menu'>
      {obj.usercon.token==""&&<Link to='/login'>Login</Link>}
        {obj.usercon.token==""&&<Link to='/reg'>Register</Link>}
        {obj.usercon.token!=""&&obj.usercon.role=='admin'&&<Link to='/add'>AddItem</Link>}
        {obj.usercon.token!=""&&<Link to='/profile'>Profile</Link>}
        {obj.usercon.token!=""&&<Link to='/logout'>Logout</Link>}
    </div>}
        <div className='postcon'>
          {
            prod.map((item)=>{
              return(
              <div className='post'>
                <div className='img'><img src={`http://localhost:5000/imgs/${item.pimg}`}/></div> 
               <hr></hr>
                <p><span>Name:</span>{item.name}</p>
                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                <p><span>Price:</span>{item.price}</p>
                <p><span>Description:</span>{item.desc}</p>
                <p><span>Discount:</span>{item.dct}</p>
                <button className='kmbtn' onClick={()=>knowmore(item)}><span>Reviews: </span>Know More..</button>
                {obj.usercon.role=='user'&&<button className='btn'onClick={()=>addcart(item)}>AddCart</button>}
                {obj.usercon.role=='admin'&&<button className='btn'onClick={()=>updprod(item)}>Update Product</button>}
                {obj.usercon.role=='admin'&&<button className='btn' onClick={()=>del(item)}>Delete</button>}
                {<button className='btn' onClick={()=>buynow(item)}>Buy Now</button>}
              </div>
              )
            })
          }
        </div>
        </div>
  )
}

export default Home