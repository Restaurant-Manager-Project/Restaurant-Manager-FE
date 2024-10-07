import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [menu, setMenu] = React.useState("home");

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to="/"><li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</li></Link>
        <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
        <li onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>about</li>
        <li onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>contact</li>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-cart'>
        <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} /></Link>
          <div className="dot"></div>
        </div>
        <li><FontAwesomeIcon icon={faUser} /></li>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar
