// MyPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  //세션에 저장되어있는 로그인 정보 읽어오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/userdata', {
          withCredentials: true,
        });

        setUserInfo(response.data);
        setEditedUserInfo(response.data);
      } catch (error) {
        console.error('사용자 정보를 불러오지 못했습니다', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:8080/api/user/update', editedUserInfo, {
        withCredentials: true,
      });

      setUserInfo(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('사용자 정보를 업데이트하지 못했습니다', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedUserInfo({ ...editedUserInfo, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      {isEditing ? (
        <div>
          <p>User ID: {userInfo.id}</p>
          <label>Email:</label>
          <input
            type="text"
            name="userEmail"
            value={editedUserInfo.userEmail}
            onChange={handleInputChange}
          />
          <label>Nickname:</label>
          <input
            type="text"
            name="nickname"
            value={editedUserInfo.nickname}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>User ID: {userInfo.id}</p>
          <p>Email: {userInfo.userEmail}</p>
          <p>Nickname: {userInfo.nickname}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default MyPage;
