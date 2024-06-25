import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => {
    const accessToken = response.data.accessToken;
    if (accessToken) {
      localStorage.setItem("token", accessToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
