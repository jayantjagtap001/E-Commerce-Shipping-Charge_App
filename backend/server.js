const express = require('express');
const cors = require('cors');  // To handle CORS
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); 


const warehouses = [
  { warehouseId: 1, lat: 12.99999, lng: 37.923273 },
  { warehouseId: 2, lat: 11.99999, lng: 27.923273 },
];


app.get('/api/v1/warehouse/nearest', (req, res) => {
  const { sellerLat, sellerLng } = req.query;

  if (!sellerLat || !sellerLng) {
    return res.status(400).json({ error: 'Missing seller location parameters' });
  }

  let nearestWarehouse = null;
  let minDistance = Infinity;

  warehouses.forEach(warehouse => {
    const distance = Math.sqrt(
      Math.pow(warehouse.lat - sellerLat, 2) + Math.pow(warehouse.lng - sellerLng, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestWarehouse = warehouse;
    }
  });

  if (nearestWarehouse) {
    return res.json({
      warehouseId: nearestWarehouse.warehouseId,
      warehouseLocation: { lat: nearestWarehouse.lat, lng: nearestWarehouse.lng },
    });
  } else {
    return res.status(404).json({ error: 'No warehouses found' });
  }
});



app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
