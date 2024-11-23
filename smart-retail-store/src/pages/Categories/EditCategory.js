import React, { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../../services/categoryService";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams(); // ดึง id จาก URL
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryById(id); // ดึงข้อมูลหมวดหมู่จาก API
        setName(data.name);
      } catch (error) {
        console.error("Failed to fetch category:", error);
        setMessage("Failed to fetch category.");
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCategory(id, { name });
      setMessage(response.message);
      navigate("/categories"); // กลับไปหน้ารายการหมวดหมู่
    } catch (error) {
      console.error("Failed to update category:", error);
      setMessage("Failed to update category.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
