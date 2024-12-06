import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../../AuthProvider';
import { assets } from '../../assets/assets';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://restaurant-manager-be-f47n.onrender.com/login', {
                username,
                password
            });
            if (response.data.success) {
                console.log(response.data.result);
                setToken(response.data.result);
                localStorage.setItem("token", response.data.result)
                navigate("/", { replace: true });
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Error logging in');
        }
    };

    return (
        <div className='overlay'>
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Đăng nhập</h2>
                {error && <div className="error">{error}</div>}
                <div className="login-input">
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="login-input">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;