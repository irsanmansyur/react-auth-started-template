import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    let resp = await axios.get(`http://localhost:3001/users`);
    setUsers(resp.data);
  };

  useEffect(() => {
    users.length < 1 && fetchUsers();
  }, []);

  const delateUser = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:3001/users/${id}`);
    return fetchUsers();
  };

  return (
    <div className="App">
      <div className="w-full flex justify-between rounded p-5 rounded border  text-sky-500">
        <span>List User</span>
        <Link className="rounded border bg-sky-500 text-white px-2" to="/add">
          Tambah
        </Link>
      </div>
      <div className="w-1/2 mx-auto">
        <table className="table-auto border border-red-500 p-5 w-full">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.city}</td>
                <td>
                  <a href={`/edit/${user.id}`}>Edit</a> |
                  <button type="button" onClick={() => delateUser(user.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
