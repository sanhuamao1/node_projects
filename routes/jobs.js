const express = require('express');
const router = express.Router();
const {
   getJobs,
   getJob,
   createJob,
   removeJob,
   updateJob,
} = require('../route-handlers/jobs');

router.route('/').get(getJobs).post(createJob);
router
   .route('/:id')
   .get(getJob)
   .patch(updateJob)
   .delete(removeJob)


module.exports = router;
