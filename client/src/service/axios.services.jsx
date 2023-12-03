import { toast } from "react-toastify";
import {main_url, photo_url} from ".";

export const postData = async (url, data) => {
  try {
    const resp = await main_url.post(url, data);
    
    return resp.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};
export const postImageData = async (url, data) => {
  try {
    const resp = await photo_url.post(url, data);
    
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
    console.log(error);
    toast.error(error.response.data.message);
    throw error;
  }
};

export const deletData = async (url) => {
  try {
    const resp = await main_url.delete(url);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    throw error;
  }
};

export const updateUser = async (url, data) => {
  try {
    const resp = await main_url.patch(url, data);
    return resp.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
