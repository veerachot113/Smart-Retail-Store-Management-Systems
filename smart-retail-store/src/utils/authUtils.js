import API from "./api";

export const login = async (credentials) => {
  const response = await API.post("/users/login.php", credentials);
  return response.data;
};
