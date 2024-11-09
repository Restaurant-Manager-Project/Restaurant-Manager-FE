import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import { useOrderStatus } from '../OrderStatusContext/OrderStatusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faReceipt, faBars } from '@fortawesome/free-solid-svg-icons';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ qr_code, setShowTablePopup }) => {
  console.log('qr_code:', qr_code);
  const { cartItems } = useContext(CartContext);
  const { hasOrderData } = useOrderStatus();
  const [menu, setMenu] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [qrCode, setQrCode] = useState(null); // Define the qrCode state
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    // Khi qr_code có trong URL, lưu nó vào state
    if (qr_code) {
      setQrCode(qr_code);
    }
  }, [qr_code]);

  const handleNavigation = (path, menuName) => {
    setMenu(menuName);
    if (qr_code) {
      navigate(`/${qr_code}/${path}`);
    } else {
      navigate(`/${path}`);
    }
  };

  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo' alt='Logo' onClick={() => handleNavigation('', 'home')} />
      <ul className="navbar-menu">
        <li onClick={() => handleNavigation('', 'home')}>Trang chủ</li>
        <li onClick={() => handleNavigation('menu', 'menu')} >Menu</li>
        <li >Về chúng tôi</li>
        <li >Liên hệ</li>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-cart'>
          <FontAwesomeIcon icon={faCartShopping} onClick={() => handleNavigation('cart', 'cart')} />
          {cartItems.length > 0 && <div className="dot"></div>}
        </div>
        {!qr_code && <p className='book_table' onClick={() => setShowTablePopup(true)}>Đặt bàn</p>}
        {qr_code && (
          <div className='navbar-receipt'>
            <FontAwesomeIcon icon={faReceipt} onClick={() => { handleNavigation('place-order', 'place-order') }} />
            {hasOrderData && <div className="dot"></div>}
          </div>
        )}
      </div>
      <div className='menu-icon' onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      {dropdownOpen && (
        <div className='dropdown-menu' ref={dropdownRef}>
          <div onClick={() => { handleNavigation('', 'home'); setDropdownOpen(false); }}>Trang chủ</div>
          <div onClick={() => { handleNavigation('menu', 'menu'); setDropdownOpen(false); }}>Menu</div>
          <div >Về chúng tôi</div>
          <div >Liên hệ</div>
          <div onClick={() => { handleNavigation('cart', 'cart'); setDropdownOpen(false); }}>Giỏ hàng</div>
          <div onClick={() => setShowTablePopup(true)}>Đặt bàn</div>
          <div onClick={() => { handleNavigation('place-order', 'place-order'); setDropdownOpen(false); }}>Đơn hàng</div>
        </div>
      )}
    </div>
  );
}

export default Navbar;