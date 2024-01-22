//npm install react-kakao-login
//JS key : e37a82e7e5d11141f3bac76816aec5e7
import React from "react";
import KakaoLogin from "react-kakao-login";
import logo from "../../../img/kakao_login_medium_narrow.png";

const KakaoApp = () => {

    const kakaoLoginSuccess = (res) => {
        console.log(res);
    }
    const kakaoLoginFailure = (err) => {
        console.log(err);
    }

    return(
        <div>
            <KakaoLogin 
                token="e37a82e7e5d11141f3bac76816aec5e7"
                onSuccess={kakaoLoginSuccess}
                onFailure={kakaoLoginFailure}
                //getProfile={true}
                render = {(props) => (
                    <button
                        alt="kakaologin"
                        onClick={props.onClick}
                        style={{border:"none", background:"none"}}
                    ><img src={logo} alt="카카오로그인"/></button>
                )}
            />
        </div>
    )
}

export default KakaoApp;