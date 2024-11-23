import React, { useState } from "react";
import { addSale } from "../../services/saleService";

const SalesPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);


  const handleCheckout = async () => {
    const saleData = {
      total_price: total,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: 1,
        price: item.price,
      })),
    };
    await addSale(saleData);
    setCart([]);
    setTotal(0);
  };

  return (
    <div>
      <h1>Sales Page</h1>
      <button onClick={handleCheckout}>Checkout</button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalesPage;
