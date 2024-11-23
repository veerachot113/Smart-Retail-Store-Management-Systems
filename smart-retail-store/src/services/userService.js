import API from "./api";

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
export const getUsers = async () => {
    const response = await API.get("/users/get-users.php");
    return response.data;
  };

// เพิ่มผู้ใช้ใหม่
export const addUser = async (userData) => {
  const response = await API.post("/users/add-user.php", userData);
  return response.data;
};

