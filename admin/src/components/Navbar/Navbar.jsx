import React from 'react'
import "./Navbar.css"
import "../../assets/assets"
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <div className="admin-info">
        <span className="admin-name">Admin</span>
        <span><FontAwesomeIcon icon={faCircleUser} /></span>
      </div>
    </div>
  )
}

export default Navbar
