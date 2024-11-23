import API from "./api";

export const getDailySales = async () => {
  const response = await API.get("/reports/daily-sales-report.php");
  return response.data;
};

export const getStockSummary = async () => {
  const response = await API.get("/reports/stock-summary-report.php");
  return response.data;
};

