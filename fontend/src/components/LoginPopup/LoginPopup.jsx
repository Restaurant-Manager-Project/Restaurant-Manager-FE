import React, { useState } from 'react'
import './LoginPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function LoginPopup({setShowLogin,setShowOtp}) {

    const [currState,setCurrState] = useState("Đăng nhập")

    const handleLoginClick = () => {
        setShowLogin(false)  // Ẩn popup đăng nhập
        setShowOtp(true)     // Hiện OTP
    }

  return (
    <div className="login-popup">
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <div className='close-btn'><FontAwesomeIcon icon={faXmark} onClick={()=>setShowLogin(false)} /></div>
            </div>
            <div className="login-popup-inputs">
                {currState==="Đăng nhập"?(
                    <>
                        <input type="number" placeholder='Số điện thoại' required/>
                    </>
                ) : (
                    <>
                        <input type="text" placeholder='Tên khách hàng' required/>
                        <input type="number" placeholder='Số điện thoại' required/>
                    </>
                )}
                
            </div>
            <button onClick={currState === "Đăng nhập" ? handleLoginClick : undefined}>{currState === "Đăng nhập" ? "Đăng nhập" : "Đăng ký"}</button>
            {currState==="Đăng nhập"?<p>Chưa có tài khoản? <span onClick={()=>setCurrState("Đăng ký")}>Đăng ký ngay!</span></p>
            :<p>Bạn đã có tài khoản? <span onClick={()=>setCurrState("Đăng nhập")}>Đăng nhập ngay!</span></p>}
            
        </form>
    </div>
  )
}

export default LoginPopup
