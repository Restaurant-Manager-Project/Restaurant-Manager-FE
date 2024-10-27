import React, { useEffect, useState } from 'react';
import './LoginPopup.css';
import axios from 'axios';
import API_URLS from '../../../config';

const PopUpLogin = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [successMessage2, setSuccessMessage2] = useState('');
    const [clientInfo, setClientInfo] = useState(null);

    useEffect(() => {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');
        const overlay = document.querySelector('.overlay');

        const handleClickOutside = (event) => {
            if (!container.contains(event.target)) {
                container.style.display = "none";
                overlay.style.display = "none";
            }
        };

        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
        document.addEventListener('click', handleClickOutside);

        // Cleanup event listeners on component unmount
        return () => {
            registerBtn.removeEventListener('click', () => {
                container.classList.add("active");
            });

            loginBtn.removeEventListener('click', () => {
                container.classList.remove("active");
            });
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!validatePhone(phone)) {
          setPhoneError('Số điện thoại không hợp lệ');
          return;
        }

        try {
            const checkResponse = await axios.get(API_URLS.GET_CLIENT_BY_PHONE(phone));
            if (checkResponse.status === 200 && checkResponse.data) {
              setPhoneError('Số điện thoại đã được sử dụng');
              return;
            }
          } catch (error) {
            console.error('Error checking phone number:', error);
          }
    
        const clientData = {
          firstName,
          lastName,
          phone
        };
        
        try {
          const response = await axios.post(API_URLS.POST_CLIENT, clientData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (response.status === 200) {
            console.log('Client registered successfully');
            setSuccessMessage('Đăng ký thành công');
            // Reset form fields
            setFirstName('');
            setLastName('');
            setPhone('');
            setPhoneError('');
          } else {
            console.error('Failed to register client');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const handleSignIn = async (event) => {
        event.preventDefault();
        if (!validatePhone(phone)) {
          setPhoneError('Số điện thoại không hợp lệ');
          return;
        }
    
        try {
          const response = await axios.get(API_URLS.GET_CLIENT_BY_PHONE(phone));
    
          if (response.status === 200) {
            const data = response.data;
            setClientInfo(data);
            setSuccessMessage2('Đăng nhập thành công');
            setPhoneError('');
          } else {
            setPhoneError('Số điện thoại không tồn tại');
          }
        } catch (error) {
          console.error('Error:', error);
          setPhoneError('Có lỗi xảy ra, vui lòng thử lại');
        }
      };

    return (
        <div className="overlay">
            <div className="container" id="container">
                <div className="form-container sign-up">
                <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Họ"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Tên"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {phoneError && <p className="error" >{phoneError}</p>}
                        <button type="submit">Sign Up</button>
                        {successMessage && <p className="success" >{successMessage}</p>}
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <input
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {phoneError && <p className="error">{phoneError}</p>}
                        <button type="submit">Sign In</button>
                        {successMessage2 && <p className="success">{successMessage2}</p>}
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Chào mừng quý khách trở lại!</h1>
                            <p>Hãy nhập số điện thoại để tích điểm</p>
                            <p>Click ra ngoài để bỏ qua</p>
                            <button className="hidden" id="login">Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Xin chào quý khách!</h1>
                            <p>Hãy đăng kí thẻ thành viên để nhận nhiều chương trình khuyến mãi từ chúng tôi</p>
                            <p>Click ra ngoài để bỏ qua</p>
                            <button className="hidden" id="register">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpLogin;
