import React, {useState, useEffect} from 'react';
import axios from 'axios';

const RegistrationForm = () => {

    const[data, setData] = useState([]);
    const[newUser, setNewUser] = useState({userEmail:'', password:''});

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

    //저장 버튼 함수
    const handleAddUser = async () => {
        try{
            const response = await axios.post(
                'http://localhost:8080/api/user/add',
                newUser, {
                    withCredentials:true,
                }
            );
            //변경된 데이터 값 저장
            setData((prevUsers) => [...prevUsers, response.data]);
            //데이터 저장 후 빈값으로 초기화
            setNewUser({userEmail:'', password:''});
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
                <button>이메일 인증</button>
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
            <button onClick={handleAddUser}>가입하기</button>
        </div>
    );
};

export default RegistrationForm;
