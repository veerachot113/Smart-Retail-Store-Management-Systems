import React, { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ name: "", price: "", category_id: "" });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        const productData = await getProductById(id);
        const categoriesData = await getCategories();

        if (productData) {
          setProduct(productData); // ตั้งค่าข้อมูลสินค้าดั้งเดิม
          if (productData.image) {
            setImagePreview(`http://localhost/Smart-Retail-Store-Management-Systems/php-api/${productData.image}`);
          }
        }
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch product or categories:", error);
      }
    };

    fetchProductAndCategories();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result); // แสดงภาพตัวอย่าง
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category_id", product.category_id);
    if (selectedImage) {
      formData.append("image", selectedImage); // เพิ่มไฟล์รูปภาพหากมีการเลือก
    }

    try {
      const response = await updateProduct(id, formData);
      setMessage("Product updated successfully!");
      setTimeout(() => navigate("/products"), 2000);
    } catch (error) {
      console.error("Failed to update product:", error);
      setMessage("Failed to update product.");
    }
  };

  return (
    <div className="p-8">
      <div className="bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        {message && (
          <p className={`mb-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={product.category_id}
              onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="w-40 h-40 object-cover rounded border"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
