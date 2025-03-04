const express = require('express');
const { calculateShippingCharge } = require('../controllers/shippingController');

const router = express.Router();

router.get('/', calculateShippingCharge);

module.exports = router;
