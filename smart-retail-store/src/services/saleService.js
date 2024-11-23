import API from "./api";

export const getSales = async () => {
  const response = await API.get("/sales/get-sales.php");
  return response.data;
};

export const addSale = async (sale) => {
  const response = await API.post("/sales/create-sale.php", sale);
  return response.data;
};

