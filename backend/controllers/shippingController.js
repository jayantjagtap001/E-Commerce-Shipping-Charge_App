const customers = require('../data/customers');
const warehouses = require('../data/warehouses');
const calculateDistance = require('../utils/calculateDistance');

exports.calculateShippingCharge = (req, res) => {
  const { warehouseId, customerId, deliverySpeed } = req.query;

  if (!warehouseId || !customerId || !deliverySpeed) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const warehouse = warehouses.find((w) => w.id === parseInt(warehouseId));
  const customer = customers.find((c) => c.id === parseInt(customerId));

  if (!warehouse || !customer) {
    return res.status(404).json({ error: 'Invalid warehouse or customer ID' });
  }

  const distance = calculateDistance(
    { lat: warehouse.lat, lng: warehouse.lng },
    { lat: customer.lat, lng: customer.lng }
  );

  let transportRate = 0;
  if (distance > 500) transportRate = 1;
  else if (distance > 100) transportRate = 2;
  else transportRate = 3;

  const weight = 10;
  const baseCharge = distance * transportRate * weight;

  let shippingCharge = baseCharge;
  if (deliverySpeed === 'express') {
    shippingCharge += 10 + weight * 1.2;
  } else {
    shippingCharge += 10; 
  }

  res.json({ shippingCharge });
};
