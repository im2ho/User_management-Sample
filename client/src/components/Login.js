import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async() => {
        try {
            const response = await axios.post('http://localhost:8080/login', { userEmail, password }, { withCredentials: true });
            console.log(response.data); // 로그인 성공 메시지 또는 실패 메시지
            alert("펜픽에 오신 것을 환영합니다");
            window.location.href="http://localhost:3000/";
        } catch (error) {
            console.error('로그인 오류', error);
            alert("로그인 실패");
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Your Eamil" 
                value={userEmail} 
                onChange={e => setUserEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                vlaue={password} 
                onChange={e => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginComponent;
