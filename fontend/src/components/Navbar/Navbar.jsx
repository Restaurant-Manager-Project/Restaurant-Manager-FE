import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { assets } from '../../assets/assets'

const Navbar = () => {

  const [menu, setMenu] = React.useState("home");

  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo' />
      <ul className="navbar-menu">
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</li>
        <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
        <li onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>about</li>
        <li onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>contact</li>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-cart'>
          <FontAwesomeIcon icon={faCartShopping} />
          <div className="dot"></div>
        </div>
        <li><FontAwesomeIcon icon={faUser} /></li>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar
