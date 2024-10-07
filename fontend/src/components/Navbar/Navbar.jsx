import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [menu, setMenu] = React.useState("home");

  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo' />
      <ul className="navbar-menu">
        <Link to='/'><li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Trang chủ</li></Link>
        <Link to='/menu'><li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li></Link>
        <li onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>Về chúng tôi</li>
        <li onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Liên hệ</li>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-cart'>
          <FontAwesomeIcon icon={faCartShopping} />
          <div className="dot"></div>
        </div>
        <li><FontAwesomeIcon icon={faUser} /></li>
        <button>Đăng nhập</button>
      </div>
    </div>
  )
}

export default Navbar
