import { useEffect, useState } from "react";
import { getData } from "../service/axios.services";
import useSWR from "swr";
import { CirclesWithBar } from "react-loader-spinner";
import { Link } from "react-router-dom";

function HomePage() {
  const [datas, setData] = useState();
  const fetcher = (url) => getData(url).then((res) => res);
  const { data, error } = useSWR("/api/v1/allpost", fetcher);
  console.log(datas);
  useEffect(() => {
    setData(data);
    document.title="Blog-Home"
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
  return (
    <>
      <div className="container mx-auto mt-10 text-white">
        <div className="flex justify-end">
          <Link
            to="/blog/create"
            className="w-32 p-1 font-serif text-sm font-thin text-center text-white bg-green-500 h-7 rounded-2xl"
          >
            Create Blog
    
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
