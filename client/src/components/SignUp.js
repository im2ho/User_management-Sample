import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ userEmail: '', password: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationConfirmed, setIsVerificationConfirmed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user", {
          withCredentials: true,
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSendVerification = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/mail',
        { mail: newUser.userEmail },
        {
          withCredentials: true,
        }
      );
      alert('인증 이메일이 전송되었습니다.');
      setVerificationCode(response.data);
      setIsVerificationSent(true);
    } catch (error) {
      console.error('인증 이메일 전송 오류', error);
    }
  };

  const handleConfirmVerification = () => {
    if (verificationCode === '') {
      alert('인증 코드를 먼저 받아주세요.');
      return;
    }

    // 여기에서 서버로 인증 코드 확인 요청을 보내고 확인 여부를 받아올 수 있습니다.
    // 이 예제에서는 일단 클라이언트 상에서만 확인했다고 가정하겠습니다.
    setIsVerificationConfirmed(true);
    alert('인증이 확인되었습니다.');
  };

  const handleAddUser = async () => {
    try {
      if (!isVerificationConfirmed) {
        alert('이메일 인증을 먼저 진행해주세요.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/api/user/add',
        { ...newUser, verificationCode },
        {
          withCredentials: true,
        }
      );
      setData((prevUsers) => [...prevUsers, response.data]);
      setNewUser({ userEmail: '', password: '' });
      setVerificationCode('');
      setIsVerificationSent(false); // 회원가입 완료 후 다시 초기화
      setIsVerificationConfirmed(false);
      alert('회원가입 완료');
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error('데이터 저장오류', error);
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
      {isVerificationSent && (
        <div>
          <input
            type="text"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증 코드 입력"
          />
          <button onClick={handleConfirmVerification}>인증번호 확인</button>
        </div>
      )}
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
      <button onClick={handleAddUser}>가입하기</button>
    </div>
  );
};

export default RegistrationForm;