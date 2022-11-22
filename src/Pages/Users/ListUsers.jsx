import axios from "axios";
import { useEffect, useState } from "react";

export default function ListUsers({ user }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("users")
      .then((resp) => {
        setUsers(resp.data.result);
      })
      .catch((er) => {
        if (e.response.statusText != "ok") alert(e.response.data.message);
      });
    return () => {};
  }, []);
  return (
    <div>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.fullName}</li>
        ))}
      </ul>
    </div>
  );
}
