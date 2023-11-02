import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postData } from "../../service/axios.services";
import { toast } from "react-toastify";
function Login() {
  const [showpassword, setShowpassword] = useState(false);
  //*Using yup resolver and Schema validation
  const loginSchema = yup.object({
    email: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
  });
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  //*Function to handelsubmit data
  const Onsubmit = async(data) => {
    const resp = await postData('/api/v1/login', data)
    console.log(resp)
    if(resp.status === true){
      toast.success(resp.message)
      navigate('/blog/home')
    }
  };


  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center h-screen ">
        <div className="flex flex-col gap-5 p-4 rounded bg-zinc-600 lg:w-1/4 md:w-1/2 sm:w-4/5 shadow-[4px_4px_4px_0px_#f7fafc]">
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M5.85 17.1q1.275-.975 2.85-1.538T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.337T4 12q0 1.475.488 2.775T5.85 17.1ZM12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.012-2.488T12 6q1.475 0 2.488 1.012T15.5 9.5q0 1.475-1.012 2.488T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q1.325 0 2.5-.388t2.15-1.112q-.975-.725-2.15-1.113T12 17q-1.325 0-2.5.388T7.35 18.5q.975.725 2.15 1.113T12 20Zm0-9q.65 0 1.075-.425T13.5 9.5q0-.65-.425-1.075T12 8q-.65 0-1.075.425T10.5 9.5q0 .65.425 1.075T12 11Zm0-1.5Zm0 9Z"
              />
            </svg>
            <p className="font-serif text-4xl font-bold text-center text-black">
              Login
            </p>
          </div>
          <form
            className="flex flex-col gap-5 font-serif"
            onSubmit={handleSubmit(Onsubmit)}
          >
            <div className="flex flex-col gap-2">
              <label className=" text-black">Email</label>
              <input
                type="text"
                className="h-12 pl-2 text-black bg-white border rounded outline-none"
                id="email"
                {...register("email", { required: true })}
                autoComplete="off"
                autoFocus="on"
              />
              <span className="text-xs font-light text-red-600">
                {errors.email?.message}
              </span>
            </div>
            <div className="relative">
              <label className=" text-black">Password</label>
              <input
                type={showpassword ? "text" : "password"}
                className="h-12 w-full pl-2 text-black bg-white border rounded outline-none"
                id="password"
                autoComplete="off"
                {...register("password", { required: true })}
              />
              <span className="text-xs font-thin text-red-600">
                {errors.password?.message}
              </span>
              <div
                className="absolute top-8 right-1"
                onClick={() => setShowpassword(!showpassword)}
              >
                {showpassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"
                    />
                  </svg>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="h-10 text-lg font-semibold text-white bg-black rounded shadow-[0px_3px_6px_0px_#f7fafc] transition-all active:scale-95 ease-in-out "
            >
              Login
            </button>
          </form>
          <p className="text-center">OR</p>
          <div className="flex justify-center">
            <p>Donot have an account?</p>
            <Link
              to="/blog/signup"
              className="font-semibold text-black  hover:text-orange-500"
            >
              &nbsp;Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
