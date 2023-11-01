import axios from "axios";

const MAIN_URL = {
  baseURL: `${import.meta.env.VITE_MAIN_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const main_url = axios.create(MAIN_URL)
export default main_url;