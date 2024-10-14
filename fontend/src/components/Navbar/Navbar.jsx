import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ setShowLogin, setShowOtp }) => {

  const [menu, setMenu] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (

    <div className='navbar'>
      <Link to="/"><img src={assets.logo} className='logo' alt='Logo' /></Link>
      <ul className="navbar-menu">
        <Link to="/"><li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Trang chủ</li></Link>
        <Link to='/menu'><li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li></Link>
        <li onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>Về chúng tôi</li>
        <li onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Liên hệ</li>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-cart'>
          <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} /></Link>
          <div className="dot"></div>
        </div>
        <li><FontAwesomeIcon icon={faUser} /></li>
        <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
      </div>
      <div className='menu-icon' onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      {dropdownOpen && (
        <div className='dropdown-menu' ref={dropdownRef}>
          <Link to="/" onClick={() => { setMenu("home"); setDropdownOpen(false); }}>Trang chủ</Link>
          <Link to="/menu" onClick={() => { setMenu("menu"); setDropdownOpen(false); }}>Menu</Link>
          <Link to="/" onClick={() => { setMenu("about"); setDropdownOpen(false); }}>Về chúng tôi</Link>
          <Link to="/" onClick={() => { setMenu("contact"); setDropdownOpen(false); }}>Liên hệ</Link>
          <Link to="/cart" onClick={() => setDropdownOpen(false)}>Giỏ hàng</Link>
          <Link to="/" onClick={() => setDropdownOpen(false)}>Đăng nhập</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;