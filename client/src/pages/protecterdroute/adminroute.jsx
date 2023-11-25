import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const user = useSelector((state) => state.user);

  if (user.role === "admin") {
    return <Outlet />;
  } else {
    toast.warning("You are not authorized");
    return <Navigate to="/blog/home" />;
  }
};

export default AdminRoute;
