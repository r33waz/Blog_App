import { toast } from "react-toastify";
import main_url from ".";

export const postData = async (url, data) => {
  try {
    const resp = await main_url.post(url, data);
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getData = async (url) => {
  try {
    const resp = await main_url.get(url);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message);
    throw error;
  }
};
