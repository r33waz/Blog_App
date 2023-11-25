import { useEffect, useState } from "react";
import { getData } from "../service/axios.services";
import useSWR from "swr";
import { CirclesWithBar } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import { useSelector } from "react-redux";

function HomePage() {
  const user = useSelector((state)=>state.user)
  const [datas, setData] = useState();
  const navigate = useNavigate()
  const fetcher = (url) => getData(url).then((res) => res);
  const { data, error } = useSWR("/api/v1/allpost", fetcher);
  console.log(datas);
  useEffect(() => {
    setData(data);
    document.title = "Blog-Home";
  }, [data]);

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!datas) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CirclesWithBar
          height="100"
          width="100"
          color="white"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      </div>
    );
  }

  const postpage = (id) => {
    navigate(`/post/${id}`)
  }
  return (
    <>
      <div className="container mx-auto mt-10 text-white">
        <div className="flex justify-between">
          <div className="text-4xl font-thin create_blog">Blogs</div>
          {user.role === "admin" ? (
            <div className="flex gap-3">
              <Link
                to="/blog/admin"
                className="w-32 p-1 font-serif text-sm font-thin text-center text-white bg-blue-500 h-7 rounded-2xl"
              >
                Admin port
              </Link>
              <Link
                to="/blog/create"
                className="w-32 p-1 font-serif text-sm font-thin text-center text-white bg-green-500 h-7 rounded-2xl"
              >
                Create Blog
              </Link>
            </div>
          ) : (
            <Link
              to="/blog/create"
              className="w-32 p-1 font-serif text-sm font-thin text-center text-white bg-green-500 h-7 rounded-2xl"
            >
              Create Blog
            </Link>
          )}
        </div>
        <div className="grid gap-3 pt-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {datas.data.map((i) => {
            return (
              <div className="bg-gray-600 rounded-md shadow-sm shadow-white">
                <Slide left>
                  <div>
                    <img
                      src={i.photo}
                      alt="image"
                      className="object-fill w-full h-64 p-2 rounded-xl"
                    />
                  </div>
                </Slide>
                <Fade right>
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
                </Fade>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
