import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Users/Home";
import { userAtom } from "../store/user-atom";
import jwt_decode from "jwt-decode";

export default function PublicRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<GuestProtected component={Login} />} />
    </Routes>
  );
}

function GuestProtected({ component: Component }) {
  const navigate = useNavigate();
  let [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    if (cookies.token) {
      try {
        let payload = jwt_decode(cookies.token);
        setUser(payload);
      } catch (error) {
        setUser(null);
      }
    }
  }, [cookies]);
  if (user) navigate("/", { replace: true });
  return <Component />;
}
