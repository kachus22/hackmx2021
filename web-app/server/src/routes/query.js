// import dependencies and initialize the express router
const express = require('express');
const queryController = require('../controllers/query');

const router = express.Router();

/**
 * Query Routes
 */
router.get('/queryAll', queryController.queryAll);
router.post('/queryWithQueryString', queryController.queryWithQueryString);
router.post('/queryByKey', queryController.queryByKey);

module.exports = router;
