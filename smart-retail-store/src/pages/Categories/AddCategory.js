import React, { useState } from "react";
import { addCategory } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCategory({ name });
      setMessage(response.message);
      navigate("/categories");
    } catch (error) {
      console.error("Failed to add category:", error);
      setMessage("Failed to add category.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Category</h1>
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
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
