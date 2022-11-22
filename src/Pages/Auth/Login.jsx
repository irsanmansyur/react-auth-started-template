import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/user-atom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [user, setUser] = useRecoilState(userAtom);
  const [data, setData] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    return axios
      .post("login", data)
      .then(async (respon) => {
        let user = jwt_decode(respon.data.result.token);
        setCookie("token", respon.data.result.token, { path: "/" });
        setUser(user);
        navigate("/users", { replace: true });
      })
      .catch((err) => {
        alert("error login");
      });
    navigate("/users");
  };
  return (
    <>
      <div className="w-full max-w-xs mx-auto flex items-center min-h-screen flex-col justify-center ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-[500px]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="******************"
            />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">©2020 Acme Corp. All rights reserved.</p>
      </div>
    </>
  );
}
