import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiBox, FiShoppingCart, FiClipboard, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: "/dashboard", name: "Dashboard", icon: <FiHome /> },
    { path: "/users", name: "User Management", icon: <FiUsers /> },
    { path: "/products", name: "Product Management", icon: <FiBox /> },
    { path: "/categories", name: "Category Management", icon: <FiClipboard /> },
    { path: "/sales", name: "Sales", icon: <FiShoppingCart /> },
    { path: "/reports", name: "Reports", icon: <FiClipboard /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">POS Admin</div>
      <nav className="flex-1 p-4 space-y-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center space-x-3 py-3 px-4 rounded-md text-sm ${
              location.pathname === link.path ? "bg-blue-600 text-white" : "hover:bg-gray-800 hover:text-white text-gray-300"
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center py-2 px-4 bg-red-600 text-sm rounded-md hover:bg-red-700"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
