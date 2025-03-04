import  { useState } from 'react';
import { getNearestWarehouse } from '../api/warehouse';

const NearestWarehouse = () => {
  const [sellerId, setSellerId] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getNearestWarehouse(sellerId);
      setResult(data);
    } catch (error) {
      alert(error.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Find Nearest Warehouse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Seller ID"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {result && (
        <div>
          <h3>Nearest Warehouse</h3>
          <p>ID: {result.warehouseId}</p>
          <p>Location: {`Lat: ${result.warehouseLocation.lat}, Lng: ${result.warehouseLocation.long}`}</p>
        </div>
      )}
    </div>
  );
};

export default NearestWarehouse;
