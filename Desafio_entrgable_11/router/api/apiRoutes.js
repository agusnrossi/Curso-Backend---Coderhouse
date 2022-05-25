
const express = require('express');
const authRoutes = require('../api/auth/authRouter');

const router = express.Router();


router.use('/auth', authRoutes);

module.exports = router;