import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SessionInfo = () => {
  //const [sessionData, setSessionData] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  // 세션에 저장한 카카오 로그인 사용자 정보 받아오기
    useEffect(() => {
        const fetchKakaoUserData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/kakao-userdata', {
                    withCredentials: true,
                });
                setUserEmail(res.data.email);
            } catch (err) {
                console.error('세션 데이터 불러오기 실패', err);
            }
        };

        fetchKakaoUserData();
    }, []);

  return (
    <div>
      <h2>Session Information</h2>
        <p>Email: {userEmail}</p>
    </div>
  );
};

export default SessionInfo;
