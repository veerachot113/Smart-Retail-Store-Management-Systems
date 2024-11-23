import React from "react";

const MetricCard = ({ icon, title, value }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
    {icon}
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default MetricCard;
