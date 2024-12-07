import React, { useState } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employeeID');
    navigate('/login');
    setShowDropdown(false);
  };

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <div className="admin-info">
        <span className="admin-name">Admin</span>
        <span onClick={() => setShowDropdown(!showDropdown)}>
          <FontAwesomeIcon icon={faCircleUser} />
        </span>
        {showDropdown && (
          <div className="dropdown-menu">
            <button className="logout" onClick={handleLogout}>Đăng xuất</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;