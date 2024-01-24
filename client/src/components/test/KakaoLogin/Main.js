import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import KakaoLogin from 'react-kakao-login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from '../../../img/kakao_login_medium_narrow.png';
import SessionInfo from './KakaoSession';

const KakaoApp = () => {

    const kakaoLoginSuccess = (res) => {
        
        // Kakao 로그인 성공 시에 서버로 데이터 전송
        const { access_token } = res.response;

        // 카카오 API를 통해 사용자 정보를 가져오기
        axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(userInfoResponse => {
            const { email, nickname } = userInfoResponse.data.kakao_account;
            
            // 서버로 access_token 전송
            axios.post('http://localhost:8080/api/kakao-login', {
                access_token : access_token,
                email: email,
                nickname: nickname,
            }, {
                withCredentials:true
            })
            .then(serverResponse => {
                console.log(serverResponse.data);
                window.location.href="/kakaoInfo";
            })
            .catch(error => {
                console.error(error);
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    const kakaoLoginFailure = (err) => {
        console.log(err);
    }

    return(
        <div>
            <KakaoLogin 
                //JS RESTApi key
                token="e37a82e7e5d11141f3bac76816aec5e7"
                onSuccess={kakaoLoginSuccess}
                onFailure={kakaoLoginFailure}
                render={(props) => (
                    <button
                        alt="kakaologin"
                        onClick={props.onClick}
                        style={{border:"none", background:"none"}}
                    ><img src={logo} alt="카카오로그인"/></button>
                )}
            /><br />
            <a href='/kakaoInfo'>카카오 로그인 정보</a>
        </div>
    )
} //KakaoApp

function App() {
  return (
    <Router>
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h1>React from SpringBoot</h1> 
      <div style={{marginTop: "30px", width:"500px", margin:"auto"}}>
        <h2>Log In</h2>
        <h2>==========================</h2>
        <div style={{marginTop:"10px"}}>  
            <Routes>
                <Route path="/" element={<KakaoApp />} />
                <Route path="/kakaoInfo" element={<SessionInfo/>} />
            </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
