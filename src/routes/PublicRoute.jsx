import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Users/Home";
import { userAtom } from "../store/user-atom";

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
  let user = useRecoilValue(userAtom);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    if (cookies || user) navigate("/", { replace: true });
  }, []);
  return <Component />;
}
