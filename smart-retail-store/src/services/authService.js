import API from "./api";


// ฟังก์ชัน Login
export const login = async ({ email, password }) => {
  const response = await API.post("/users/login.php", { email, password });
  return response.data;
};

// ฟังก์ชันสำหรับเพิ่ม Token ใน Headers
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};


