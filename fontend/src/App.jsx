import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, useParams } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Menu from './pages/Menu/Menu';
import TablePopup from './components/TablePopup/TablePopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import { CartProvider } from './components/CartContext/CartContext';
import { OrderStatusProvider } from './components/OrderStatusContext/OrderStatusContext';
import PaymentCallback from './pages/PaymentCallback/PaymentCallback';
import API_URLS from '../config';

const App = () => {
  const [qrCode, setQrCode] = useState(null);
  const [tableId, setTableId] = useState(null);
  const [showTablePopup, setShowTablePopup] = useState(false);
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowTablePopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <CartProvider>
      <OrderStatusProvider>
        <div className='app'>
          <Navbar qr_code={qrCode} setShowTablePopup={setShowTablePopup} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/vnpay-callback' element={<PaymentCallback />} />
            <Route path='/:qr_code/*' element={<MainContent setTableId={setTableId} setQrCode={setQrCode} />} />
          </Routes>
          {showTablePopup && (
            <div className="table-popup-overlay">
              <div ref={popupRef}>
                <TablePopup />
              </div>
            </div>
          )}
        </div>
        <Footer />
      </OrderStatusProvider>
    </CartProvider>
  );
};

const MainContent = ({ setTableId, setQrCode }) => {
  const { qr_code } = useParams();
  const [localTableId, setLocalTableId] = useState(null);

  useEffect(() => {
    if (qr_code) {
      setQrCode(qr_code);
      fetch(API_URLS.GET_TABLE(qr_code))
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.success && data.result) {
            setTableId(Number(data.result.id));
            setLocalTableId(Number(data.result.id));
            console.log('Fetched tableId:', data.result.id);
          } else {
            console.error('Error: Invalid API response structure', data);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, [qr_code, setTableId, setQrCode]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='menu' element={<Menu />} />
      <Route path='cart' element={<Cart tableId={localTableId} />} />
      <Route path='place-order' element={<PlaceOrder />} />
      <Route path='vnpay-callback' element={<PaymentCallback />} />
    </Routes>
  );
};

export default App;