import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// AuthProvider와 useAuth 추가
import { AuthProvider, useAuth } from './AuthContext';
import User from './UserList';
import SignUp from './SignUp';
import Login from './Login';
import KakaoLoginPage from './KakaoLoginPage';
import MyPage from './MyPage';

function App() {
  return (
    // AppContent : AuthProvider의 children
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const AppContent = () => {
  // useAuth 훅으로 컨텍스트 값 가져오기 (state)
  const { userEmail, isAuthenticated, isLoading } = useAuth();

  // 초기 로딩 중에는 아무것도 반환하지 않음
  if (isLoading) {
    return null;
  }

  // 초기 렌더링 시에는 세션값이 있는지 여부에 따라 적절한 화면을 반환
  return (
    <Router>
      <Link to="/">Main</Link>
      {/* 로그인 정보가 존재하면 회원가입, 로그인 링크 가리기 */}
      {isAuthenticated ? 
        <Link to="/myPage">MyPage</Link> : (
        <>
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
          <Link to="/kakao/login">KakaoLogin</Link>
        </>
      )}
      <h1>React & SpringBoot로 회원관리</h1>
      <p>현재 로그인 회원 : {userEmail}</p>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/myPage" element={<MyPage />} />
        {/* 로그아웃 상태일 때 렌더링 되는 컴포넌트들 */}
        {!isAuthenticated && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/kakao/login" element={<KakaoLoginPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
