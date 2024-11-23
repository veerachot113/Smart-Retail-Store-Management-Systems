import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar ควรอยู่ตรงนี้เพียงครั้งเดียว */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
