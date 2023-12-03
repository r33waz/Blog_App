import axios from "axios";

const MAIN_URL = {
  baseURL: `${import.meta.env.VITE_MAIN_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const main_url = axios.create(MAIN_URL);

const PHOTO_URL = {
  baseURL: `${import.meta.env.VITE_MAIN_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

const photo_url = axios.create(PHOTO_URL);

export { main_url, photo_url };
