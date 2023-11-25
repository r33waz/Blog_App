import React, { useEffect, useState,Fragment } from "react";
import useSWR from "swr";
import { deletData, getData } from "../../service/axios.services";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserTab() {
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate()
  const fetcher = (url) => getData(url).then((res) => res.data);
  const { data, isLoading, error } = useSWR("/api/v1/getalluser", fetcher);
  console.log(data);
  useEffect(() => {
    setDatas(data);
  }, [data]);
    
    
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    }
    
    const DeleteUser = async (id) => {
        const resp = await deletData(
          `/api/v1/deleteuser/${id}`
        );
        if (resp.status) {
            const updatedUser = datas.filter((user) => {
                return datas._id !==id
            })
          setDatas(updatedUser)
      }
      toast.success(resp.message)
  }
  

  const EiditUser = (id) => {
    navigate(`/eidit/user/${id}`)
  }
  return (
    <>
      <div className="container mx-auto ">
        <div className="mt-10">
          <table class="lg:table-fixed md:table-fixed table-auto w-full text-center rounded-lg">
            <thead className="bg-black ">
              <tr className="h-10 text-center border">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th></th>
              </tr>
            </thead>
            {datas.map((i) => {
              return (
                <tbody className="text-black bg-white border ">
                  <tr className="h-10 text-sm text-center hover:bg-gray-300">
                    <td>{i.firstname}</td>
                    <td>{i.lastname}</td>
                    <td>{i.email}</td>
                    <td>{i.phonenumber}</td>
                    <td className="flex items-center justify-around gap-2 pt-2">
                      <div className="flex w-full">
                        <button
                          type="button"
                          onClick={()=>EiditUser(i._id)}
                          className="w-full p-1 font-medium text-white bg-blue-600 rounded"
                        >
                          Eidit
                        </button>
                      </div>
                      <button onClick={()=>DeleteUser(i._id)} className="w-full p-1 text-white bg-red-600 rounded">Delete</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default UserTab;
