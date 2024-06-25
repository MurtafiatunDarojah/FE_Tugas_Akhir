import fetchData from "./api";

export const createHias = async (data) => {
  try {
    return await fetchData("post", "hias", data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getHiasAnalytics = async () => {
  try {
    return await fetchData("get", "hias/analytics");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getHias = async (currentPage, limit, search) => {
  try {
    let endpoint = "hias";

    if (currentPage || limit || search) {
      endpoint += `?page=${currentPage}&limit=${limit}&search=${search}`;
    }

    return await fetchData("get", endpoint);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMyHias = async (id) => {
  try {
    return await fetchData("get", `myhias/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getHiasById = async (id) => {
  try {
    return await fetchData("get", `hias/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateHias = async (id, data) => {
  try {
    return await fetchData("patch", `hias/${id}`, data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteHias = async (id) => {
  try {
    return await fetchData("delete", `hias/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
