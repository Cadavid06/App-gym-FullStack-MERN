import axios from "axios";

const instance = axios.create({
  baseURL: "https://5wlpjd2w-4000.use2.devtunnels.ms/api",
  withCredentials: true,
});

export default instance
