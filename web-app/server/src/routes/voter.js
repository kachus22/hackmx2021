// import dependencies and initialize the express router
const express = require('express');
const voterController = require('../controllers/voter');

const router = express.Router();

/**
 * Voter Routes
 */
router.post('/registerVoter', voterController.registerVoter);
router.post('/validateVoter', voterController.validateVoter);

module.exports = router;
