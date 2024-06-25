import fetchData from "./api";

export const createEmployee = async (data) => {
  try {
    return await fetchData("post", "employees", data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmployeesAnalytics = async () => {
  try {
    return await fetchData("get", "employees/analytics");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmployees = async (currentPage, limit, search) => {
  try {
    let endpoint = "employees";

    if (currentPage || limit || search) {
      endpoint += `?page=${currentPage}&limit=${limit}&search=${search}`;
    }

    return await fetchData("get", endpoint);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmployeesDecrypted = async (currentPage, limit, search) => {
  try {
    let endpoint = "employees/decrypted";

    if (currentPage || limit || search) {
      endpoint += `?page=${currentPage}&limit=${limit}&search=${search}`;
    }

    return await fetchData("get", endpoint);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmployeeById = async (id) => {
  try {
    return await fetchData("get", `employees/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateEmployee = async (id, data) => {
  try {
    return await fetchData("put", `employees/${id}`, data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteEmployee = async (id) => {
  try {
    return await fetchData("delete", `employees/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
