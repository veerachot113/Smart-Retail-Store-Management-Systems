import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/Users/UserList";
import AddUser from "./pages/Users/AddUser";
import ProductList from "./pages/Products/ProductList";
import AddProduct from "./pages/Products/AddProduct";
import CategoryList from "./pages/Categories/CategoryList"; 
import AddCategory from "./pages/Categories/AddCategory"; 
import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditCategory from "./pages/Categories/EditCategory"; 
import EditProduct from "./pages/Products/EditProduct";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <UserList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddUser />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <ProductList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddProduct />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditProduct />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Layout>
                <CategoryList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCategory />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditCategory />
              </Layout>
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
