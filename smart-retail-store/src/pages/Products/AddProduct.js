import React, { useState, useEffect } from "react";
import { addProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService"; // ดึงข้อมูลหมวดหมู่
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null); // ใช้สำหรับไฟล์อัพโหลด
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setMessage("Failed to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ใช้ FormData สำหรับส่งข้อมูลที่มีไฟล์
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category_id", categoryId);
    if (image) {
      formData.append("image", image); // ใส่ไฟล์รูปภาพ
    }

    try {
      const response = await addProduct(formData);
      setMessage(response.message);
      navigate("/products"); // กลับไปหน้า Product List หลังเพิ่มสำเร็จ
    } catch (error) {
      console.error("Failed to add product:", error);
      setMessage("Failed to add product.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} // เก็บไฟล์ใน state
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
