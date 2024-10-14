import React from 'react'
import './OTP.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function OTP({setShowOtp}) {
  return (
    <div className='otp-popup'>
      <form className="otp-popup-container">
        <div className="otp-popup-title">
          <h2>Nhập mã OTP</h2>
          <div className='close-btn'><FontAwesomeIcon icon={faXmark} onClick={()=>setShowOtp(false)} /></div>
          <p>Vui lòng nhập mã OTP vừa được gửi tới số điện thoại</p>
          <span>0123456789</span>
        </div>
        <div className="otp-popup-inputs">
          <input type="number" maxLength={1}/>
          <input type="number" maxLength={1}/>
          <input type="number" maxLength={1}/>
          <input type="number" maxLength={1}/>
          <input type="number" maxLength={1}/>
          <input type="number" maxLength={1}/>
        </div>
      </form>
    </div>
  )
}

export default OTP
