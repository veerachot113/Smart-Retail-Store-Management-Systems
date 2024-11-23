import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { Link } from "react-router-dom"; // ใช้สำหรับสร้างลิงก์ไปหน้าเพิ่มผู้ใช้

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* ปุ่ม Add User */}
      <div className="mb-4 flex justify-end">
        <Link to="/users/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Add User
          </button>
        </Link>
      </div>

      {/* ตารางแสดงผู้ใช้ */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
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

export default UserList;
