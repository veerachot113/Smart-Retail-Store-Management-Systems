import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // หากไม่มี Token จะเปลี่ยนเส้นทางไปยังหน้า Login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
