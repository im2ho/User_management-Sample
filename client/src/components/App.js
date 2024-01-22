import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import User from './UserList';
import SignUp from './SignUp';
import Login from './Login';
//import Kakao from './KakaoLogin';


function App() {
  const [userEmail, setUserEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/userdata', {
          withCredentials: true,
        });
        setUserEmail(res.data.userEmail);
        setAuthentication(res.data.userEmail);
      } catch (err) {
        console.error('세션 데이터 불러오기 실패', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const setAuthentication = (userEmail) => {
    if (userEmail !== '') {
      setIsAuthenticated(true);
    }
  };

  // 초기 로딩 중에는 아무것도 반환X
  if (isLoading) {
    return null;
  }

  // 초기 렌더링 시에는 세션값이 있는지 여부에 따라 적절한 화면을 반환
  return (
    <Router>
      <Link to="/">Main</Link>
      {isAuthenticated ? (
        null
      ) : <>
      <Link to="/signup">SignUp</Link>
      <Link to="/login">Login</Link>
      <Link to="/kakao/login">KakaoLogin</Link>
    </>}
      <h1>React & SpringBoot로 회원관리</h1>
      <Routes>
        <Route path="/" element={<User />} />
        {!isAuthenticated && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;