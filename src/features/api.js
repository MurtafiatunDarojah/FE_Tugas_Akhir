import axios from "axios";

const baseURL = "http://localhost:5000/";

const fetchData = async (method, url, data = null, params = null) => {
  const token = localStorage.getItem("token");

  const config = {
    method: method,
    url: baseURL + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
    params: params,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default fetchData;
