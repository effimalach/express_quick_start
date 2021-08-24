const express = require('express');
const userRoutes = require('./routes/userRoutes');
const couponRoutes = require('./routes/couponRouts');
const router = express.Router();

router.use('/user', userRoutes);
router.use('/coupon', couponRoutes);

module.exports = router;
