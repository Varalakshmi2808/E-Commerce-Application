import React, { useEffect, useContext ,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Ct from './components/Ct'
import { HashLink } from 'react-router-hash-link';

const Nav = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let [text,setText]=useState()
  useEffect(()=>{
    obj.updcon({"sidebar":false})
  },[])
  let fun=(e)=>{
    setText(e.target.value)
    obj.updcon({"srch":text})
  }
  let side=()=>{
    obj.updcon({"sidebar":!obj.usercon.sidebar})
  }
  return (
    <div className='nav'>
  <button onClick={side} className='sidebar'>{obj.usercon.sidebar==false?<i class="fa-solid fa-bars">
    </i>:<p>Hide bar</p>}</button>
      {<Link to='/'><i class="fa-solid fa-house-chimney" ></i></Link>}
        <div id="search"><input type="text" placeholder='search Here' onChange={fun} value={text}/>
        <Link to='search'><i class="fa-solid fa-magnifying-glass"></i></Link>
        </div>
        {obj.usercon.token!=""&&obj.usercon.role=="user"&&<Link to='/cart'><i class="fa-solid fa-cart-shopping"></i></Link>}
        </div>
  )
}

export default Nav