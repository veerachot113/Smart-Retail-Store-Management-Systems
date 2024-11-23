import React from "react";

const ChartCard = ({ title, children }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    {children}
  </div>
);

export default ChartCard;
