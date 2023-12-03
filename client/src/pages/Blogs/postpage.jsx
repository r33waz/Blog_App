import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { getData } from '../../service/axios.services'
function PostPage() {
  const [datas, setDatas] = useState();
  const {id} = useParams()
  console.log(id)
  const fetcher = (url) => getData(url).then((res) => res.data);
  const { data, isLoading } = useSWR(
    `/api/v1/post/${id}`,
    fetcher
  );
   useEffect(() => {
    document.title = "Blog-Update";
    setDatas(data.data);
  }, [data]);
  console.log(data)
  return (
    <div className="container mx-auto">
      <div className="p-8">
        <div>
          <h1 className="font-semibold text-3xl">{data?.title}</h1>
          <p>Categotry:{data.categorys[0]}</p>
          <span className="font-semibold">
            Created Date :{" "}
            {data?.createdAt.length > 10
              ? data?.createdAt.slice(0, 10)
              : data?.createdAt}{" "}
          </span>
        </div>
        <div className="flex flex-col pt-8">
          <img
            src={data.photo}
            className="h-96 object-contain"
            alt="post imgae"
          />
        </div>
        <div className="lg:w-[75%] mg:w-[65%] ">
          <span className="text-lg text-justify text-black dark:text-white">
            <div>{data?.description}</div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostPage