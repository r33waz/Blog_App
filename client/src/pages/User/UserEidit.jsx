import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getData, updateUser } from "../../service/axios.services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

function UserEidit() {
  const { id } = useParams();
  console.log(id);
   const admin = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  console.log(user);
  //*Using yup resolver for update schema validation
  const updateSchema = yup.object({
    firstname: yup.string().required("Please enter your firstname"),
    lastname: yup.string().required("Please enter your lastname"),
    email: yup
      .string()
      .required("Please enter your email")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email type"),
    phonenumber: yup.string().required("Please enter your phone mumber"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password should conatin special character"
      ),
    role: yup.string().required("Please enter your role"),
  });
  const fetcher = (url) => getData(url).then((res) => res.data);
  const { data, isLoading, error } = useSWR(
    `/api/v1/getalluser/${id}`,
    fetcher
  );
  useEffect(() => {
    document.title = "Blog-Update";
    setUser(data);
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateSchema),
  });
  const Onsubmit = async (data) => {
    const resp = await updateUser(`/api/v1/updateuser/${id}`, data);
    if (resp.status) {
      navigate("/blog/home");
      toast.success(resp.message);
    }
  };

  return (
    <>
      <>
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-screen ">
            <div className="flex flex-col  p-4 rounded bg-zinc-600 lg:w-1/4 md:w-1/2 sm:w-4/5 shadow-[4px_4px_4px_0px_#f7fafc]">
              <form
                className="flex flex-col gap-2 font-serif"
                onSubmit={handleSubmit(Onsubmit)}
              >
                <div className="flex flex-col gap-2">
                  <label className="text-black ">First Name</label>
                  <input
                    type="text"
                    className="h-12 pl-2 text-black bg-white border rounded outline-none"
                    id="firstname"
                    {...register("firstname", { required: true })}
                    defaultValue={user?.firstname}
                    autoComplete="off"
                    autoFocus="on"
                  />
                  <span className="text-xs font-light text-red-600">
                    {errors.firstname?.message}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-black ">Last Name</label>
                  <input
                    type="text"
                    className="h-12 pl-2 text-black bg-white border rounded outline-none"
                    id="username"
                    {...register("lastname", { required: true })}
                    defaultValue={user?.lastname}
                    autoComplete="off"
                  />
                  <span className="text-xs font-light text-red-600">
                    {errors.lastname?.message}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black ">Email</label>
                  <input
                    type="text"
                    className="h-12 pl-2 text-black bg-white border rounded outline-none"
                    id="email"
                    {...register("email", { required: true })}
                    autoComplete="off"
                    defaultValue={user?.email}
                  />
                  <span className="text-xs font-light text-red-600">
                    {errors.email?.message}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black ">Phone number</label>
                  <input
                    type="text"
                    className="h-12 pl-2 text-black bg-white border rounded outline-none"
                    id="phonenumber"
                    {...register("phonenumber", { required: true })}
                    defaultValue={user?.phonenumber}
                    autoComplete="off"
                  />
                  <span className="text-xs font-light text-red-600">
                    {errors.phonenumber?.message}
                  </span>
                </div>

                <div className="flex flex-col gap-2 ">
                  <label className="text-black">Password</label>
                  <div className="relative">
                    <input
                      type={"text"}
                      className="w-full h-12 pl-2 text-black bg-white border rounded outline-none"
                      id="password"
                      autoComplete="off"
                      {...register("password", { required: true })}
                    />
                    <span className="text-xs font-thin text-red-600">
                      {errors.password?.message}
                    </span>
                  </div>
                </div>
                {admin.role === "admin" ? (
                  <div className="flex flex-col gap-2">
                    <label className="text-black ">User role</label>
                    <input
                      type="text"
                      className="h-12 pl-2 text-black bg-white border rounded outline-none"
                      id="tole"
                      {...register("role", { required: true })}
                      defaultValue={user?.role}
                      autoComplete="off"
                    />
                    <span className="text-xs font-light text-red-600">
                      {errors.role?.message}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <label className="text-black ">User role</label>
                    <input
                      type="text"
                      className="h-12 pl-2 text-black bg-white border rounded outline-none"
                      id="tole"
                      {...register("role", { required: true })}
                      value={user?.role}
                      autoComplete="off"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="h-10 text-lg font-semibold text-white bg-black rounded shadow-[0px_3px_6px_0px_#f7fafc] transition-all active:scale-95 ease-in-out "
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default UserEidit;
