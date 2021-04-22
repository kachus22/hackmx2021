// import dependencies and initialize the express router
const express = require('express');
const votesController = require('../controllers/votes');

const router = express.Router();

/**
 * Votes Routes
 */
router.get('/getCurrentStanding', votesController.getCurrentStanding);
router.post('/castBallot', votesController.castBallot);

module.exports = router;
