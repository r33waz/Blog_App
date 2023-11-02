import { useNavigate } from "react-router-dom";
import BlogLogo from "../assets/blog-svgrepo-com.svg";
import { postData } from "../service/axios.services";
import { toast } from "react-toastify";

function HomePage() {
  const navigate = useNavigate();
  const Logout = async () => {
    const resp = await postData("/api/v1/logout");
    if (resp.status === true) {
      navigate("/blog/login");
      toast.success(resp.message);
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <nav className="flex justify-between shadow-lg p-2 items-center">
          <img src={BlogLogo} alt="logo" className="w-10 h-10" />
          <div className="flex gap-4 items-center">
            <button
              onClick={Logout}
              className="bg-white text-black p-1 rounded-md font-semibold font-mono"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default HomePage;
