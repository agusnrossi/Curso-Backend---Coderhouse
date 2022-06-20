
const express = require('express');
const authRoutes = require('./auth/authRouter');
const randomRoutes = require('./random/random');
const router = express.Router();


router.use('/auth', authRoutes);
router.use('/random', randomRoutes);


module.exports = router;