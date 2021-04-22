// import dependencies and initialize the express router
const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

/**
 * Auth Routes
 */
router.post('/', authController.login);

module.exports = router;
