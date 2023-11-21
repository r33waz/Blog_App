import { postData } from "../../service/axios.services";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import BlogLogo from "../../assets/blog-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { logout } from "../authentication/loginSlice";
import { useState } from "react";

function NavBar() {
  const name = useSelector((state) => state.user);
  console.log(name)
  const [isMobile, setMobile] = useState(false);
  const navbarToggle = () => {
    setMobile(!isMobile);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = async () => {
    const resp = await postData("/api/v1/logout");
    if (resp.status === true) {
      dispatch(logout(resp));
      navigate("/blog/login");
      toast.success(resp.message);
    }
  }

  const eiditblog = (id)=>{
    navigate(`/editBlog/${id}`)
  }

  return (
    <>
      <div className="container mx-auto">
        <nav className="sticky top-0 z-50 flex items-center justify-between p-2 shadow-lg">
          <div className="flex items-center gap-2">
            <img src={BlogLogo} alt="logo" className="w-10 h-10" />
            <span className="font-serif text-lg">Blogs</span>
          </div>
          <div className="justify-between hidden gap-4 md:flex lg:flex">
            <div className="flex items-center gap-10">
              <Link to="/blog/home">Home</Link>
              <Link>Category</Link>
              <Link>About</Link>
              <Link>Contact</Link>
            </div>
            {name.email ? (
              <div className="items-center hidden gap-2 md:flex ">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="outline-none">
                    <div className="flex gap-2 text-justify">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 11q.825 0 1.413-.588Q14 9.825 14 9t-.587-1.413Q12.825 7 12 7q-.825 0-1.412.587Q10 8.175 10 9q0 .825.588 1.412Q11.175 11 12 11Zm0 2q-1.65 0-2.825-1.175Q8 10.65 8 9q0-1.65 1.175-2.825Q10.35 5 12 5q1.65 0 2.825 1.175Q16 7.35 16 9q0 1.65-1.175 2.825Q13.65 13 12 13Zm0 11q-2.475 0-4.662-.938q-2.188-.937-3.825-2.574Q1.875 18.85.938 16.663Q0 14.475 0 12t.938-4.663q.937-2.187 2.575-3.825Q5.15 1.875 7.338.938Q9.525 0 12 0t4.663.938q2.187.937 3.825 2.574q1.637 1.638 2.574 3.825Q24 9.525 24 12t-.938 4.663q-.937 2.187-2.574 3.825q-1.638 1.637-3.825 2.574Q14.475 24 12 24Zm0-2q1.8 0 3.375-.575T18.25 19.8q-.825-.925-2.425-1.612q-1.6-.688-3.825-.688t-3.825.688q-1.6.687-2.425 1.612q1.3 1.05 2.875 1.625T12 22Zm-7.7-3.6q1.2-1.3 3.225-2.1q2.025-.8 4.475-.8q2.45 0 4.463.8q2.012.8 3.212 2.1q1.1-1.325 1.713-2.95Q22 13.825 22 12q0-2.075-.788-3.887q-.787-1.813-2.15-3.175q-1.362-1.363-3.175-2.151Q14.075 2 12 2q-2.05 0-3.875.787q-1.825.788-3.187 2.151Q3.575 6.3 2.788 8.113Q2 9.925 2 12q0 1.825.6 3.463q.6 1.637 1.7 2.937Z"
                          />
                        </svg>
                      </button>
                      <div className="flex flex-col ">
                        <p>{name.name}</p>
                        <small>{name.email}</small>
                      </div>
                    </div>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content className="flex flex-col gap-2 bg-white shadow-[0px_0px_3px_1px_#f7fafc]  border-black border-2 text-black mr-5 w-40 duration-500 font-semibold p-2 rounded-md mt-2">
                    <DropdownMenu.Item className="flex gap-2 outline-none">
                      <button
                        onClick={()=>{eiditblog(name.id)}}
                        className="flex  text-center font-mono font-semibold text-black bg-white rounded-md text-sm"
                      >
                        
                        Eidit Account
                      </button>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item className="outline-none">
                      <button
                        onClick={Logout}
                        className="flex items-center p-1 font-mono font-semibold text-base gap-2 text-black bg-white rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className="rotate-180"
                        >
                          <path
                            fill="currentColor"
                            d="M10.09 15.59L11.5 17l5-5l-5-5l-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                          />
                        </svg>
                        Logout
                      </button>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/blog/login"
                  className="p-1 text-lg font-semibold text-black bg-white rounded"
                >
                  Login
                </Link>
                <Link
                  to="/blog/signup"
                  className="p-1 text-lg font-semibold text-black bg-white rounded"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          <div className="pt-1 duration-500 md:hidden lg:hidden">
            <button onClick={navbarToggle}>
              {isMobile ? (
                <svg
                  className="w-6 h-6 text-gray"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gray"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
        {isMobile && (
          <>
            <div className="sticky z-50 flex flex-col items-start gap-3 text-black bg-white top-14 md:hidden lg:hidden ">
              <div className="flex flex-col w-full gap-2">
                {name.email ? (
                  <div className="z-50 flex items-center gap-2">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger className="w-full outline-none">
                        <div className="flex w-full gap-2 pb-2 text-justify border-b-2 border-black">
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M12 11q.825 0 1.413-.588Q14 9.825 14 9t-.587-1.413Q12.825 7 12 7q-.825 0-1.412.587Q10 8.175 10 9q0 .825.588 1.412Q11.175 11 12 11Zm0 2q-1.65 0-2.825-1.175Q8 10.65 8 9q0-1.65 1.175-2.825Q10.35 5 12 5q1.65 0 2.825 1.175Q16 7.35 16 9q0 1.65-1.175 2.825Q13.65 13 12 13Zm0 11q-2.475 0-4.662-.938q-2.188-.937-3.825-2.574Q1.875 18.85.938 16.663Q0 14.475 0 12t.938-4.663q.937-2.187 2.575-3.825Q5.15 1.875 7.338.938Q9.525 0 12 0t4.663.938q2.187.937 3.825 2.574q1.637 1.638 2.574 3.825Q24 9.525 24 12t-.938 4.663q-.937 2.187-2.574 3.825q-1.638 1.637-3.825 2.574Q14.475 24 12 24Zm0-2q1.8 0 3.375-.575T18.25 19.8q-.825-.925-2.425-1.612q-1.6-.688-3.825-.688t-3.825.688q-1.6.687-2.425 1.612q1.3 1.05 2.875 1.625T12 22Zm-7.7-3.6q1.2-1.3 3.225-2.1q2.025-.8 4.475-.8q2.45 0 4.463.8q2.012.8 3.212 2.1q1.1-1.325 1.713-2.95Q22 13.825 22 12q0-2.075-.788-3.887q-.787-1.813-2.15-3.175q-1.362-1.363-3.175-2.151Q14.075 2 12 2q-2.05 0-3.875.787q-1.825.788-3.187 2.151Q3.575 6.3 2.788 8.113Q2 9.925 2 12q0 1.825.6 3.463q.6 1.637 1.7 2.937Z"
                              />
                            </svg>
                          </button>
                          <div className="flex flex-col underline">
                            <p className="font-bold">{name.name}</p>
                            <small>{name.email}</small>
                          </div>
                        </div>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="flex flex-col gap-2 bg-white shadow-[0px_0px_3px_1px_#f7fafc]  border-black border-2 text-black mr-5 w-40 duration-500 font-semibold p-2 rounded-md ">
                        <DropdownMenu.Item className="flex gap-2 outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M5 23.7q-.825 0-1.413-.587T3 21.7v-14q0-.825.588-1.413T5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.588 1.413T19 23.7H5Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-7.2 7.225H9v-4.25l7.175-7.175Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6t1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8l-2.475 2.475Z"
                            />
                          </svg>
                          Eidit Account
                        </DropdownMenu.Item>

                        <DropdownMenu.Item className="outline-none">
                          <button
                            onClick={Logout}
                            className="flex items-center p-1 font-mono font-semibold text-black bg-white rounded-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              className="rotate-180"
                            >
                              <path
                                fill="currentColor"
                                d="M10.09 15.59L11.5 17l5-5l-5-5l-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                              />
                            </svg>
                            Logout
                          </button>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </div>
                ) : (
                  <Link to="/blog/login">Login</Link>
                )}
                <div className="flex flex-col w-full gap-2 text-lg font-semibold ">
                  <Link to="/blog/home" className="hover:underline">
                    Home
                  </Link>
                  <Link className="hover:underline">Category</Link>
                  <Link className="hover:underline">About</Link>
                  <Link className="hover:underline">Contact</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default NavBar;
