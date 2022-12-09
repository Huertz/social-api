const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// fixed this part of routes.api
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;