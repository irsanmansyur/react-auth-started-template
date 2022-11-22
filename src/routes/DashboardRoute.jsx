import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Dashboard from "../Pages/Dashboard";
import ListUsers from "../Pages/Users/ListUsers";
import { userAtom } from "../store/user-atom";
import jwt_decode from "jwt-decode";
import ErrorPage from "../Pages/errors/error-page";

export default function DashboardRoute() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<ProtectedRoute role="sdadmin" component={ListUsers} />} />
    </Routes>
  );
}

function ProtectedRoute({ component: Component, role = "admin" }) {
  let navigate = useNavigate();
  let [user, setUser] = useRecoilState(userAtom);
  const [cookies, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!cookies.token) navigate("/login", { replace: true });
    try {
      let payload = jwt_decode(cookies.token);
      setUser(payload);
    } catch (error) {
      removeCookie("token");
      setUser(null);
    }
    setLoading(false);
  }, [cookies]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (!user) navigate("/login", { replace: true });

  if (role != user.role) return <ErrorPage code={403} message={`Maaf anda tidak di izinkan untuk role ${role}`} />;
  return <Component user={user} restOfProps />;
}
