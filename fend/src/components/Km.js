import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie'

const Km = () => {
    let [item,setItem]=useState({"reviews":[]})
    let [rv,setRv]=useState({"desc":""})
    const [value, setValue] = useState(2);
    const [hover,setHover]=useState(-1)
    let obj=useContext(Ct)
    let navigate=useNavigate()
    let fun=(e)=>{
        setRv({...rv,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        if(Cookies.get('token')==undefined)
            {
      navigate("/login")
            }
            else{
              setItem(obj.usercon.prod)
            }
    },[])
    let addcart=(item)=>{
        if(obj.usercon.token==""){
          alert("login to add to cart")
        }
        else{
        axios.post("http://localhost:5000/addcart",{...item,"qty":1,"uid":obj.usercon._id,"pid":item._id},{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
          alert(res.data.msg)
        })
      }
      }

      let addrv=()=>{
        axios.put("http://localhost:5000/addrv",{"name":obj.usercon.name,"pid":item._id,...rv,"rating":value},{"headers":{"Authorization":obj.usercon.token}}).then((res)=>{
            setItem(res.data)
            setRv({"desc":""})
            setValue(2)
            
        })
    }
  return (
    <div>
        <div className='kmcon'>
        <div className='km'>
                <div className='img'><img src={`http://localhost:5000/imgs/${item.pimg}`}/></div>
                <hr></hr>
                <p><span>Name:</span>{item.name}</p>
                <p><span>Price:</span>{item.price}</p>
                <p><span>Description:</span>{item.desc}</p>
                <p><span>Discount:</span>{item.dct}</p>
                <button className='btn'onClick={()=>addcart(item)}>AddCart</button>
                </div>
                <div className='rvcon'>
        {
            item.reviews.map((rw)=>{
                return(
                    <div className='rv'>
                        <p><span>Name: </span>{rw.name}</p>
                        <p><span>Desc: </span>{rw.desc}</p>
                        <Rating name="read-only" value={rw.rating} readOnly />
                        <hr></hr>
                    </div>
                )
            })
        }
        { obj.usercon.token!=""&&obj.usercon.role=="user"&&<div className='rv'>
    <input type='text' placeholder='enter review' onChange={fun} value={rv.desc} name='desc'/>
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      
    </Box>
    <button onClick={addrv} className='btn'>Add review</button>
    

</div>}
</div>
</div>
    </div>
    
  )
}

export default Km