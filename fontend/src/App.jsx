import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Menu from './pages/Menu/Menu'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import OTP from './components/OTP/OTP'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [showOtp, setShowOtp] = useState(false)

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} setShowOtp={setShowOtp}/> : <></>}
    {showOtp ? <OTP setShowOtp={setShowOtp}/> : <></>}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setShowOtp={setShowOtp}/>
        <Routes>
          < Route path='/' element={<Home />} />
          < Route path='/menu' element={<Menu />} />
          < Route path='/cart' element={<Cart />} />
          < Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      < Footer />
    </>
  )
}

export default App
