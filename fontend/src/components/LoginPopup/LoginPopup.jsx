import React, { useState } from 'react'
import './LoginPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function LoginPopup({setShowLogin}) {

    const [currState,setCurrState] = useState("Đăng nhập")
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
                        <input type="text" placeholder='Tên đăng nhập hoặc Email' required/>
                        <input type="password" placeholder='Mật khẩu'required/>
                    </>
                ) : (
                    <>
                        <input type="text" placeholder='Tên đăng nhập' required/>
                        <input type="email" placeholder='Email'required/>
                        <input type="password" placeholder='Mật khẩu'required/>
                        <input type="password" placeholder='Nhập lại mật khẩu'required/>
                    </>
                )}
                
            </div>
            <button>{currState==="Đăng nhập"?"Đăng nhập":"Đăng ký"}</button>
            {currState==="Đăng nhập"?<p>Chưa có tài khoản? <span onClick={()=>setCurrState("Đăng ký")}>Đăng ký ngay!</span></p>
            :<p>Bạn đã có tài khoản? <span onClick={()=>setCurrState("Đăng nhập")}>Đăng nhập ngay!</span></p>}
            
        </form>
    </div>
  )
}

export default LoginPopup
