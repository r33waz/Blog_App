import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Userlogout = () => {
  const user = useSelector((state) => state.user);
  return user.islogin ? <Navigate to="/blog/home" /> : <Outlet />;
};
export default Userlogout;
