const authRoute = require('../routes/auth');
const jobsRoute = require('../routes/jobs');
const authMiddleware = require('../middleware/auth');

const mountRoutes = (app) => {
   app.use('/api/v1', authRoute);
   app.use('/api/v1/jobs', authMiddleware, jobsRoute);
};

module.exports = mountRoutes;
