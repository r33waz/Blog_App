import axios from "axios";
import { toast } from "react-toastify";

const SERVER_URL = import.meta.env.VITE_MAIN_URL;
console.log(SERVER_URL);

export const postData = async (url, data) => {
  console.log("Request Data:", data);
  try {
    const resp = await axios.post(`${SERVER_URL}${url}`, data);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
      toast.error(error.response.data.message);
    throw error;
  }
};
