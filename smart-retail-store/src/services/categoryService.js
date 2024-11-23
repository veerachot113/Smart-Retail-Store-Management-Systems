import API from "./api";

// ดึงหมวดหมู่สินค้า
export const getCategories = async () => {
  const response = await API.get("/categories/get-categories.php");
  return response.data;
};

// เพิ่มหมวดหมู่สินค้า
export const addCategory = async (category) => {
  const response = await API.post("/categories/add-category.php", category);
  return response.data;
};

// ลบหมวดหมู่สินค้า
export const deleteCategory = async (id) => {
  const response = await API.delete(`/categories/delete-category.php?id=${id}`);
  return response.data;
};

// ดึงข้อมูลหมวดหมู่ตาม ID
export const getCategoryById = async (id) => {
    const response = await API.get(`/categories/get-category.php?id=${id}`);
    return response.data;
  };
  
  // อัปเดตหมวดหมู่
  export const updateCategory = async (id, category) => {
    const response = await API.put(`/categories/update-category.php?id=${id}`, category);
    return response.data;
  };
  
  export const getProductById = async (id) => {
    const response = await API.get(`/products/get-product.php?id=${id}`);
    return response.data;
  };
  