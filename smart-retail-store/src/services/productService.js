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

export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/delete-product.php?id=${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await API.get("/categories/get-categories.php");
  return response.data;
};


export const updateProduct = async (id, formData) => {
  try {
    const response = await API.post(`/products/update-product.php`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response || error.message);
    throw error;
  }
};

