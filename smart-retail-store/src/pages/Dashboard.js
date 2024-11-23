import React, { useEffect, useState } from "react";
import { getDailySales, getStockSummary } from "../services/reportService";
import { FiShoppingCart, FiBox, FiUsers, FiDollarSign } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [dailySales, setDailySales] = useState(0);
  const [stockSummary, setStockSummary] = useState([]);
  const [salesChartData, setSalesChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await getDailySales();
        setDailySales(salesData.daily_sales || 0);

        const stockData = await getStockSummary();
        setStockSummary(stockData);

        setSalesChartData({
          labels: salesData.labels || ["Jan", "Feb", "Mar"], // สมมติค่า
          datasets: [
            {
              label: "Daily Sales",
              data: salesData.values || [10, 20, 30], // สมมติค่า
              backgroundColor: "rgba(59, 130, 246, 0.5)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Daily Sales */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <FiDollarSign className="text-blue-500 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Daily Sales</h3>
            <p className="text-2xl font-bold">${dailySales.toFixed(2)}</p>
          </div>
        </div>
        {/* User Management */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <FiUsers className="text-green-500 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Users</h3>
            <p className="text-2xl font-bold">150</p> {/* สมมติ */}
          </div>
        </div>
        {/* Product Management */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <FiBox className="text-yellow-500 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Products</h3>
            <p className="text-2xl font-bold">320</p> {/* สมมติ */}
          </div>
        </div>
        {/* Sales Transactions */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <FiShoppingCart className="text-red-500 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Transactions</h3>
            <p className="text-2xl font-bold">75</p> {/* สมมติ */}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales Overview</h3>
          {salesChartData.labels ? (
            <Bar
              data={salesChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Daily Sales Chart",
                  },
                },
              }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Stock Summary</h3>
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-2 py-1">Product</th>
                <th className="px-2 py-1">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stockSummary.slice(0, 5).map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-2 py-1">{item.name}</td>
                  <td className="px-2 py-1">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
