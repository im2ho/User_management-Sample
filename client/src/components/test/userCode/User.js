import { useEffect, useState } from "react"
import axios from "axios"

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
      {
        users ? users.map((user) =>
          <div key={user.id}>
            <h3>{user.name} {user.age}</h3>
            <p>{user.introduce}</p>
          </div>
        ) : null
      }
    </div>
  )
}