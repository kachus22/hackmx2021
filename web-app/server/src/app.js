'use strict';

const appzip = require('appmetrics-zipkin')({
  host: 'localhost',
  port: 9411,
  serviceName:'webapp',
  sampleRate: 1.0
});

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// Enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Logging
 */
const log4js = require('log4js');
log4js.configure({
  appenders: { 
    'file': { type: 'file', filename: 'logs/file.log' },
    'out': { type: 'stdout' }
  },
  categories: { default: { appenders: ['file', 'out'], level: 'debug' } }
});
const logger = log4js.getLogger();
app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'debug' }));

/**
 * Routes
 */
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const queryRoutes = require('./routes/query');
const voterRoutes = require('./routes/voter');
const votesRoutes = require('./routes/votes');

// Routes and API calls
app.use('', authRoutes);
app.use('/health', healthRoutes);
app.use('', queryRoutes);
app.use('', voterRoutes);
app.use('', votesRoutes);

/**
 * Ping Route
 */
const { authenticateJWT } = require('./auth');
app.get('/ping', authenticateJWT, (req, res) => {
  res.json('pong');
});

/**
 * Default path to serve up SPA (Single Page Application)
 */
app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});

/**
 * Error handler for unmatched routes or api calls
 */
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

/**
 * Start Node Server
 */
const port = process.env.PORT || 8081;
app.listen(port, () => {
  logger.info(`Service started on port ${port}`);
});

module.exports = app;
