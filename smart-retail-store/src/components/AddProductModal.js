import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../services/productService";

const AddProductModal = ({ isOpen, onClose, onProductSaved, editingProduct }) => {
  const [product, setProduct] = useState({ name: "", price: "", category_id: "", image: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setProduct({
        name: editingProduct.name,
        price: editingProduct.price,
        category_id: editingProduct.category_id,
        image: null,
      });
      setPreviewImage(
        editingProduct.image
          ? `http://localhost/Smart-Retail-Store-Management-Systems/php-api/${editingProduct.image}`
          : null
      );
    } else {
      setProduct({ name: "", price: "", category_id: "", image: null });
      setPreviewImage(null);
    }
  }, [editingProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category_id", product.category_id);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      onProductSaved();
      onClose();
    } catch (err) {
      setError("Failed to save product. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={product.category_id}
              onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {/* Replace with dynamic categories */}
              <option value="1">Electronics</option>
              <option value="2">Fashion</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            {previewImage && (
              <div className="mb-2 flex justify-center">
                {/* จัดรูปภาพให้อยู่ตรงกลาง */}
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded shadow-md"
                />
              </div>
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
