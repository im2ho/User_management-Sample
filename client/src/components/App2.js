import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import User from './UserList';
import SignUp from './SignUp';
import Login from './Login';
import KakaoLoginPage from './KakaoLoginPage';
import KakaoSession from './test/KakaoLogin/KakaoSession';


function App() {
  const [userEmail, setUserEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 이메일 로그인 정보 불러오기
        const resUserData = await axios.get('http://localhost:8080/userdata', {
          withCredentials: true,
        });
  
        setUserEmail(resUserData.data.userEmail);
        setAuthentication(resUserData.data.userEmail);
      } catch (err) {
        console.error('이메일 회원 로그인 정보 없음', err);
  
        try {
          // 카카오 로그인 정보 불러오기
          const resKakaoData = await axios.get('http://localhost:8080/api/kakao-userdata', {
            withCredentials: true,
          });
  
          setUserEmail(resKakaoData.data.userEmail);
          setAuthentication(resKakaoData.data.userEmail);
        } catch (err) {
          console.error('카카오 로그인 정보 없음', err);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  

  //로그인 상태 설정
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
      <p>현재 로그인 회원 : {userEmail}</p>
      <Routes>
        <Route path="/" element={<User />} />
        {!isAuthenticated && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/kakao/login" element={<KakaoLoginPage />} />
            <Route path="/kakaoInfo" element={<KakaoSession/>} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:8080/userdata', {
  //         withCredentials: true,
  //       });
  //       setUserEmail(res.data.userEmail);
  //       setAuthentication(res.data.userEmail);
  //     } catch (err) {
  //       console.error('세션 데이터 불러오기 실패', err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchUserData();
  // }, []);