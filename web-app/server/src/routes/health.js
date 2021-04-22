// import dependencies and initialize the express router
const express = require('express');
const HealthController = require('../controllers/health');

const router = express.Router();

/**
 * Health Routes
 */
router.get('', HealthController.getHealth);

module.exports = router;
