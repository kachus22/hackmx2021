'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 8081;

const { authenticateJWT } = require('./middleware/auth');
const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

/**
 * Controllers
 */
const authController = require('./controllers/auth');
const queryController = require('./controllers/query');
const voterController = require('./controllers/voter');
const votesController = require('./controllers/votes');

/**
 * Auth Routes
 */
 app.post('/login', authController.login);

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
  res.json('pong');
});

/**
 * Error handler
 */
app.use(errorHandler.catchNotFound);
app.use(errorHandler.handleError);

app.listen(port, () => {
  console.log(`Service started on port ${port}`);
});