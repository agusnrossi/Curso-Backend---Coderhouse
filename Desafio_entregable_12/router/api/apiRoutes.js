
const express = require('express');
const authRoutes = require('./auth/authRouter');
const randomRoute = require('./random/randomRouter');
const router = express.Router();


router.use('/auth', authRoutes);
router.use('/random', randomRoute);


module.exports = router;