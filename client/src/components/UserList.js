import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UserMain() {

    const[data, setData] = useState([]);

    const [userEmail, setUserEmail] = useState('');


    //전체 사용자 받아오기
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const res = await axios.get('http://localhost:8080/api/user',{
                    withCredentials: true,
                });
                setData(res.data);
            } catch(error) {
                console.log(error);
            }
        };

        fetchData();

    },[]);

    //로그인한 사용자 정보 받아오기
    useEffect(() => {
        // 세션에 저장된 사용자 이름을 불러오기 위해 서버에 요청 (이메일 로그인)
        const fetchUserData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/userdata',{
                    withCredentials: true
                });
                setUserEmail(res.data.userEmail);
            } catch (err) {
                console.error('세션 데이터 불러오기 실패', err);
            }
        };
        fetchUserData();
    }, []);

    return(
        <div>
            <p>현재 로그인 회원 : {userEmail}</p>
            <h2>All User List</h2>
            <ul>
                {data.map((user) => (
                <li key={user.id}>
                    {user.id} : {user.userEmail}
                </li>
                ))}
            </ul>
        </div>
    );
}