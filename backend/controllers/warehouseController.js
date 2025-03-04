const warehouses = require('../data/warehouses');
const calculateDistance = require('../utils/calculateDistance');

exports.getNearestWarehouse = (req, res) => {
  const { sellerLat, sellerLng } = req.query;

  if (!sellerLat || !sellerLng) {
    return res.status(400).json({ error: 'Missing seller location coordinates' });
  }

  let nearest = null;
  let minDistance = Infinity;

  warehouses.forEach((warehouse) => {
    const distance = calculateDistance(
      { lat: sellerLat, lng: sellerLng },
      { lat: warehouse.lat, lng: warehouse.lng }
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearest = warehouse;
    }
  });

  if (nearest) {
    res.json({
      warehouseId: nearest.id,
      warehouseLocation: nearest,
    });
  } else {
    res.status(404).json({ error: 'No warehouse found' });
  }
};
