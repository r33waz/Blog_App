import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { postData } from "../../service/axios.services";
import { useSelector } from "react-redux";
import { useState } from "react";
function CreateBlog() {
  const user = useSelector((state) => state.user);
  const [picture, setPicture] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onsubmit(data) {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("photo", data.photo[0].name);
    formData.append("userid", user.id);
    formData.append("username", user.name);
    formData.append("category", data.category);
    trigger(formData);
  }

  async function createpost(url, { arg }) {
    await postData(url, arg);
  }

  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  const { trigger } = useSWRMutation("/api/v1/createpost", createpost);
  return (
    <div className="container mx-auto">
      <div className="flex justify-center pt-8 items-center create_blog">
        <h1 className="text-4xl font-serif underline flex items-center">
          Create Your Blog
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5.4 6h13.2l-.85-1H6.25L5.4 6Zm4.6 6.75l2-1l2 1V8h-4v4.75ZM5 21q-.825 0-1.413-.588T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V10q-.525 0-1.038.075t-.962.3V8h-3v5.125l-1.925 1.925L12 14l-4 2V8H5v11h7v2H5ZM16 8h3h-3ZM5 8h9.075H5Zm9 13v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5H14Zm7.5-6.575l-.925-.925l.925.925Zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025v.95Zm3.525-3.525l-.475-.45l.925.925l-.45-.475Z"
            />
          </svg>
        </h1>
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex text-black justify-center  items-center mt-8 p-8">
          <div className="bg-white p-2 w-screen md:w-[50%] lg:w-[40%] flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-lg font-serif ">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="h-9 w-full pl-2 outline-none text-white rounded"
                {...register("title", { required: true })}
                autoComplete="off"
                autoFocus="on"
              />
              <span className="text-xs font-semibold text-red-600">
                {errors.title && <p>Title field is required</p>}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-serif ">Description</label>
              <textarea
                id="description"
                type="text"
                placeholder="Description"
                className="h-32 w-full pl-2 pt-1 outline-none text-white rounded"
                {...register("description", { required: true })}
                autoComplete="off"
                autoFocus="on"
              />
              <span className="text-xs font-semibold text-red-600">
                {errors.description && <p>Description is required</p>}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-serif ">Upload Image</label>
              <input
                id="photo"
                type="file"
                placeholder="Upload Image"
                className="h-10 w-full pl-2 pt-2 font-semibold outline-none  text-black border-2 border-black rounded"
                {...register("photo", { required: true })}
                onChange={onChangePicture}
                autoComplete="off"
                autoFocus="on"
              />
              <span className="text-xs font-semibold text-red-600">
                {errors.photo && <p>Image is required</p>}
              </span>
            </div>
            <div>
              {picture ? (
                <img
                  src={picture}
                  alt=""
                  className="rounded  h-52 w-full border border-black"
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-serif ">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Category"
                className="h-10 w-full pl-2 pt- font-semibold outline-none  text-white rounded"
                {...register("category", { required: true })}
                autoComplete="off"
                autoFocus="on"
              />
              <span className="text-xs font-semibold text-red-600">
                {errors.category && <p>Category  is required</p>}
              </span>
            </div>
            <button
              type="submit"
              className="bg-black text-white h-10 rounded font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
