import axios from "axios";
import { toast } from "react-toastify";
import main_url from ".";

export const postData = async (url, data) => {
  console.log("Request Data:", data);
  try {
    const resp = await main_url.post(url, data);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};
