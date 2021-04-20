'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const port = process.env.PORT || 8081;

const { authenticateJWT } = require('./auth');
let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const { config } = require('./services/config');

/**
 * Controllers
 */
const authController = require('./controllers/auth');
const queryController = require('./controllers/query');
const voterController = require('./controllers/voter');
const votesController = require('./controllers/votes');

//use this identity to query
const appAdmin = config.appAdmin;

/**
 * Auth Routes
 */
 app.get('/login', authController.login);

/**
 * Query Routes
 */
app.get('/queryAll', queryController.queryAll);
app.post('/queryWithQueryString', queryController.queryWithQueryString);
app.post('/queryByKey', queryController.queryByKey);

/**
 * Voter Routes
 */
app.post('/registerVoter', voterController.registerVoter);
app.post('/validateVoter', voterController.validateVoter);

/**
 * Votes Routes
 */
app.get('/getCurrentStanding', votesController.getCurrentStanding);
app.post('/castBallot', votesController.castBallot);

app.get('/ping', authenticateJWT, (req, res) => {
  res.json(pong);
});

app.listen(port, () => {
  console.log(`Service started on port ${port}`);
});