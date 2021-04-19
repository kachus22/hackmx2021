/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const MyContract = require('./lib/voterContract.js');
// const MyQueryContract = require('./lib/query.js');

module.exports.MyContract = MyContract;
// module.exports.MyQueryContract = MyQueryContract;

module.exports.contracts = [ MyContract ];
