import React from 'react';
import axios from 'axios';
import KakaoLogin from 'react-kakao-login';
import logo from '../img/kakao_login_medium_narrow.png';

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
            //const { email, nickname } = userInfoResponse.data.kakao_account;
            const  email  = userInfoResponse.data.kakao_account.email;
            const  nickname  = userInfoResponse.data.properties.nickname;
            console.log("email", email);
            console.log("nickname", nickname);
            
            // 서버로 access_token , email, nickname 전송
            axios.post('http://localhost:8080/api/kakao-login', {
                access_token : access_token,
                email: email,
                nickname: nickname,
            }, {
                withCredentials:true
            })
            .then(serverResponse => {
                console.log(serverResponse.data);
                alert("펜픽에 오신 것을 환영합니다");
                window.location.href="http://localhost:3000/";
            })
            .catch(error => {
                console.error(error);
                alert("로그인 실패");
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
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h1>React from SpringBoot</h1> 
      <div style={{marginTop: "30px", width:"500px", margin:"auto"}}>
        <h2>Log In</h2>
        <div style={{marginTop:"10px"}}>  
            <KakaoApp />
        </div>
      </div>
    </div>
  );
}

export default App;
