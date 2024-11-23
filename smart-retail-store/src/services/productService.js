import API from "./api";

export const getProducts = async () => {
    const response = await API.get("/products/get-products.php");
    return response.data;
  };

// ดึงข้อมูลสินค้าเฉพาะตัวตาม ID
export const getProductById = async (id) => {
  const response = await API.get(`/products/get-product.php?id=${id}`);
  return response.data;
};
  

export const addProduct = async (formData) => {
  const response = await API.post("/products/add-product.php", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // ต้องระบุ multipart/form-data
    },
  });
  return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await API.post("/products/delete-product.php", { id: productId });
    return response.data;
  };

export const getCategories = async () => {
  const response = await API.get("/categories/get-categories.php");
  return response.data;
};


export const updateProduct = async (id, product) => {
  const response = await API.put(`/products/update-product.php?id=${id}`, product);
  if (response.data.status === "success") {
    return response.data.message; // ส่งข้อความสำเร็จกลับไป
  } else {
    throw new Error(response.data.message); // ขว้าง Error เมื่อเกิดปัญหา
  }
};

