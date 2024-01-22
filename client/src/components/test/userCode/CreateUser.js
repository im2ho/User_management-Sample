import { useEffect, useState } from "react"
import axios from "axios"

//CreateUser 컴포넌트 추가
function CreateUser() {

  return (
      <form method="post" action="/user/create">
          <h3>이름</h3>
          <input type="text" name="name"></input>
          <h3>나이</h3>
          <input type="number" name="age"></input>
          <h3>소개</h3>
          <textarea name="introduce" rows="5"></textarea>
          
          <br></br>
          <input type="submit" value="생성"></input>
      </form>
  )
}

//UpdateUser 컴포넌트 생성
//어떤 user의 소개글을 식별하기 위해 id를 인자로 받음
function UpdateUser({id}){
    return(
    <form method="post" action="/user/update">
      <input type="" name="id" value={id}></input>
      <br></br>
      <input type="text" name="introduce"></input>
      <input type="submit" value="소개 수정"></input>
    </form>
    )
}

export default function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getUser() {
      const response = await axios.get(`/user`);
      const data = response.data;

      setUsers(data);
    }

    getUser();
  }, []);

  return (
    <div>
    {/* CreateUser 컴포넌트 사용 */}
      <CreateUser />
      {
        users ? users.map((user) =>
          <div key={user.id}>
            <h3>{user.name} {user.age}</h3>
            <p>{user.introduce}</p>
            {/* user삭제 버튼 추가 */}
            <a href={`/user/delete?id=${user.id}`}>삭제 ID: {user.id}</a>
            {/* Update 컴포넌트 사용 */}
            <UpdateUser id={user.id}/>
          </div>
        ) : null
      }
    </div>
  )
}