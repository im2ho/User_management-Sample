import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// context 생성 (로그인 정보)
const AuthContext = createContext();

// AuthProvider : 로그인 정보 확인 컴포넌트
export const AuthProvider = ({ children }) => {
  // 상태 변수 초기화
  const [userEmail, setUserEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect > 초기 데이터 로딩 시 로그인 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resUserData = await axios.get('http://localhost:8080/userdata', {
          withCredentials: true,
        });

        setUserEmail(resUserData.data.userEmail);
        setAuthentication(resUserData.data.userEmail);
      } catch (err) {
        console.error('이메일 회원 로그인 정보 없음', err);

        // try {
        //   const resKakaoData = await axios.get('http://localhost:8080/api/kakao-userdata', {
        //     withCredentials: true,
        //   });

        //   setUserEmail(resKakaoData.data.userEmail);
        //   setAuthentication(resKakaoData.data.userEmail);
        // } catch (err) {
        //   console.error('카카오 로그인 정보 없음', err);
        // }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 로그인 여부를 확인하여 인증 상태 설정
  const setAuthentication = (userEmail) => {
    if (userEmail !== '') {
      setIsAuthenticated(true);
    }
  };

  // 컨텍스트 제공
  return (
    // userEmail, isAuthenticated 포함한 객체로 설정 'value' prop 전달
    <AuthContext.Provider value={{ userEmail, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}; //AuthProvider()

// useAuth : 다른 컴포넌트에서 AuthContext 값을 사용하기 위한 훅
export const useAuth = () => {
  return useContext(AuthContext);
};
