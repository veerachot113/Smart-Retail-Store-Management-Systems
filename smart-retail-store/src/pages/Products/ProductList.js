import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/productService";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Invalid data format from API.");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products. Please try again.");
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <div className="mb-4 flex justify-end">
        <Link to="/products/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Add Product
          </button>
        </Link>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b border-gray-300 px-4 py-2 text-left">Image</th>
            <th className="border-b border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border-b border-gray-300 px-4 py-2 text-left">Price</th>
            <th className="border-b border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border-b border-gray-300 px-4 py-2">
                  {product.image ? (
                    <img
                      src={`http://localhost/Smart-Retail-Store-Management-Systems/php-api/${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border-b border-gray-300 px-4 py-2">${product.price}</td>
                <td className="border-b border-gray-300 px-4 py-2">
                  <Link to={`/products/edit/${product.id}`}>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
