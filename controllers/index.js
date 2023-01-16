const router = require('express').Router();

const apiRoutes = require('./api/index-routes');
const homeRoutes = require('./home-routes.js');
const dishRoutes = require('./api/dish-routes');
// const eventRoutes = require('./api/event-routes');
// const dashboardRoutes = require('./api/dashboardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api/dish-routes', dishRoutes);
// router.use('/api/event-routes', eventRoutes);
// router.use('/api/dashboard',dashboardRoutes);



module.exports = router;