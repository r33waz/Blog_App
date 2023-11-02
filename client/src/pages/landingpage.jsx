import { Link } from "react-router-dom";
import BlogLogo from '../assets/blog-svgrepo-com.svg'

function BlogLanding() {
  return (
    <>
      <div className="container mx-auto">
        <nav className="flex justify-between shadow-lg p-2 items-center">
          <img src={BlogLogo} alt="logo" className="w-10 h-10"/>
          <div className="flex gap-4 items-center">
            <Link
              to="/blog/login"
              className="bg-white text-black p-1 rounded-md font-semibold font-mono"
            >
              Login
            </Link>
            <Link
              to="/blog/signup"
              className="bg-white text-black p-1 rounded-md font-semibold font-mono"
            >
              Signup
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default BlogLanding;
