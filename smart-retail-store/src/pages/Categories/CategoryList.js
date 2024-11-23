import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../services/categoryService";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

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

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
      setMessage("Failed to delete category.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      <div className="mb-4 flex justify-end">
        <Link to="/categories/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Add Category</button>
        </Link>
      </div>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-600">Category Name</th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
  {categories.length > 0 ? (
    categories.map((category) => (
      <tr key={category.id} className="hover:bg-gray-100">
        <td className="border-b border-gray-300 px-4 py-2">{category.name}</td>
        <td className="border-b border-gray-300 px-4 py-2">
          <Link to={`/categories/edit/${category.id}`}>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition">
              Edit
            </button>
          </Link>
          <button
            onClick={() => handleDelete(category.id)}
            className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2" className="text-center py-4 text-gray-500">
        No categories found.
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default CategoryList;
