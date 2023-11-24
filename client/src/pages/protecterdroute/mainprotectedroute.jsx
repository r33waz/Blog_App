import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MainProtectdRoute = () => {
  const user = useSelector((state) => state.user.islogin);
  return user ? <Outlet /> : <Navigate to="/blog/login"/>;
};

export default MainProtectdRoute;
