import React, { useEffect, useState } from "react";
import { getProducts, getProductById, deleteProduct } from "../../services/productService";
import AddProductModal from "../../components/AddProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // เก็บข้อมูลสินค้าที่กำลังแก้ไข
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to fetch products. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = async (id) => {
    try {
      const product = await getProductById(id); // ดึงข้อมูลสินค้า
      setEditingProduct(product); // ตั้งค่าข้อมูลสินค้าใน state
      setIsModalOpen(true); // เปิดป็อปอัพ
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setError("Failed to fetch product for editing.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product. Please try again.");
    }
  };

  const handleProductSaved = () => {
    setEditingProduct(null); // รีเซ็ตข้อมูลสินค้าใน state
    fetchProducts(); // รีเฟรชรายการสินค้า
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => {
            setEditingProduct(null); // เคลียร์ข้อมูลสินค้าใน state
            setIsModalOpen(true); // เปิดป็อปอัพ
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductSaved={handleProductSaved}
        editingProduct={editingProduct} // ส่งข้อมูลสินค้าไปยัง Modal
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2">
                {product.image && (
                  <img
                    src={`http://localhost/Smart-Retail-Store-Management-Systems/php-api/${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.category_name}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
