import React, { useState } from 'react';
import { calculateShipping } from '../api/shipping';

const ShippingCharges = () => {
  const [formData, setFormData] = useState({
    sellerId: '',
    customerId: '',
    deliverySpeed: 'standard',
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await calculateShipping(
        formData.sellerId,
        formData.customerId,
        formData.deliverySpeed
      );
      setResult(data);
    } catch (error) {
      alert(error.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Calculate Shipping Charges</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seller ID"
          value={formData.sellerId}
          onChange={(e) => setFormData({ ...formData, sellerId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Customer ID"
          value={formData.customerId}
          onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
        />
        <select
          value={formData.deliverySpeed}
          onChange={(e) => setFormData({ ...formData, deliverySpeed: e.target.value })}
        >
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div>
          <h3>Shipping Details</h3>
          <p>Charge: Rs {result.shippingCharge}</p>
          <p>Nearest Warehouse: {result.nearestWarehouse.warehouseId}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingCharges;
