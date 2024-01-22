import React, {useState, useEffect} from 'react';
import axios from 'axios';

const RegistrationForm = () => {

    const[data, setData] = useState([]);
    const[newUser, setNewUser] = useState({userEmail:'', password:''});
    const [verificationCode, setVerificationCode] = useState('');

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const res = await axios.get("http://localhost:8080/api/user",{
                    withCredentials:true,
                });
                setData(res.data);
            } catch(error) {
                console.log(error);
            }
        };
        fetchData();
    },[]);

    //데이터를 input에서 작성한 내용으로 변경하는 함수
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewUser((prevUser) => ({...prevUser, [name]:value}));
    };

    /*
        const {name, value} = e.target;
        setNewUser((prevUser) => ({...prevUser, [name] : value}));

        위에서 작성한 name과 value는 input 태그의 속성을 의미
        name에서 username은 http://localhost:8080/api/user의 json으로 참조된 값으로 변경 불가
    */

    //이메일 인증하기 버튼 함수
    const handleSendVerification = async () => {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/user/send-verification-email',
            { userEmail: newUser.userEmail },
            {
              withCredentials: true,
            }
          );
          alert('인증 이메일이 전송되었습니다.');
          setVerificationCode(response.data); // 서버에서 생성한 인증 코드 저장
        } catch (error) {
          console.error('인증 이메일 전송 오류', error);
        }
    };

    //저장 버튼 함수
    const handleAddUser = async () => {
        try{

            //인증 코드 확인 로직
            if (verificationCode === '') {
                alert('이메일 인증을 먼저 진행해주세요.');
                return;
            }

            const response = await axios.post(
                'http://localhost:8080/api/user/add',
                { ...newUser, verificationCode }, {
                    withCredentials:true,
                }
            );
            //변경된 데이터 값 저장
            setData((prevUsers) => [...prevUsers, response.data]);
            //데이터 저장 후 빈값으로 초기화
            setNewUser({userEmail:'', password:''});
            setVerificationCode('');
            alert("회원가입 완료");
            window.location.href="http://localhost:3000/";
        } catch(error){
            console.error('데이터 저장오류',error);
        }
    };


    return (
        <div>
            <h2>회원 가입</h2>
            <div>
                <input 
                    type="email" 
                    name="userEmail"
                    value={newUser.userEmail}
                    onChange={handleInputChange}
                    placeholder="UserEmail" 
                    required
                />
                <button onClick={handleSendVerification}>이메일 인증</button>
            </div>
            <div>
                <input 
                    type="password" 
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    name="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="인증 코드 입력"
                />
            </div>
            <button onClick={handleAddUser}>가입하기</button>
        </div>
    );
};

export default RegistrationForm;