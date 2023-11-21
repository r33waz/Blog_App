import { useEffect, useState } from "react";
import { getData } from "../service/axios.services";
import useSWR from "swr";

function HomePage() {
  const [datas, setData] = useState();
  const fetcher = (url) => getData(url).then((res) => res);
  const { data, error } = useSWR("/api/v1/allpost", fetcher);
  console.log(datas);
  useEffect(() => {
    setData(data);
  }, [data]);

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!datas) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="container mx-auto mt-10 text-white">sadsadsadsadsa</div>
    </>
  );
}

export default HomePage;
