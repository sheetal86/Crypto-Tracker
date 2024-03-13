import React from 'react'
import { NavLink } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

function Header() {

   const {currency,setCurrency}=CryptoState();
  //  console.log(currency);
  return (
    <div className='container'>
        <nav className="navbar kas3">
  <div className="container-fluid">
    <NavLink className="navbar d-inline navbar-brand text-danger fs-1" to="/">CRYPTOracker</NavLink>
    <select className="form-select kas border border-danger " aria-label="Default select example "
    value={currency} onChange={(e)=>setCurrency(e.target.value)}>
  <option value="USD">USD</option>
  <option value="INR">INR</option>
    </select> 
  </div>
</nav>
<hr/>
    </div>
  )
}

export default Header