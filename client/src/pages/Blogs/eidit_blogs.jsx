import useSWR from "swr";
import { deletData, getData } from "../../service/axios.services";
import { useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { toast } from "react-toastify";

function EiditBlog() {
  const [posts, setposts] = useState([]);
  const [visible, setVisible] = useState(6);
  const fetcher = (url) => getData(url).then((res) => res.data);
  const { data, isLoading } = useSWR("/api/v1/allpost", fetcher);
  console.log(posts);

  useEffect(() => {
    setposts(data);
  }, [data]);

  const ShowMoreData = () => {
    setVisible((preValue) => preValue + 6);
  };

  const deletePost = async(id) => {
    const resp = await deletData(`/api/v1/deletepost/${id}`);
    if (resp.status) {
      const deleterdpost = posts.filter((post) => {
        return post._id !== id
      })
      setposts(deleterdpost)
    }
    toast.success(resp.message)
  }
  return (
    <div className="container mx-auto mt-10 text-white">
      {isLoading ? (
        <CirclesWithBar />
      ) : (
        <>
          <div className="grid gap-3 pt-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {posts?.slice(0, visible).map((i) => {
              return (
                <div className="bg-gray-600 rounded-md shadow-sm shadow-white">
                  <div className="flex justify-end">
                    <button className="m-1 bg-red-600 rounded-full" onClick={()=>deletePost(i._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="p-1"
                      >
                        <path
                          fill="currentColor"
                          d="M5 21V6H4V4h5V3h6v1h5v2h-1v15H5Zm2-2h10V6H7v13Zm2-2h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
                        />
                      </svg>
                    </button>
                    <button className="m-1 bg-blue-600 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="p-1"
                      >
                        <path
                          fill="currentColor"
                          d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575V19Zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21H3ZM19 6.4L17.6 5L19 6.4Zm-3.525 2.125l-.7-.725L16.2 9.225l-.725-.7Z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <img
                      src={i.photo}
                      alt="image"
                      className="object-fill w-full h-64 p-2 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <div className="pl-3">
                        <h1 className="font-thin ">Created by: {i.username}</h1>
                        <small className="">
                          Date: {i.createdAt.slice(0, 10)}
                        </small>
                      </div>
                      <div className="pr-3">{i.categorys[0]}</div>
                    </div>
                    <p className="pl-3 text-2xl font-semibold">{i.title}</p>
                    <p className="pl-3">
                      {i.description.length > 150
                        ? i.description.slice(0, 200) + "..."
                        : i.description}
                    </p>
                  </div>
                  <div className="flex justify-end pr-3">
                    <button onClick={() => postpage(i._id)}>See more</button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="p-2 m-2 text-white bg-black rounded"
            onClick={ShowMoreData}
          >
            Show More
          </button>
        </>
      )}
    </div>
  );
}

export default EiditBlog;
