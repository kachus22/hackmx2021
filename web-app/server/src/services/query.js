const network = require('../fabric/network.js');
const { config } = require('./services/config');

// Use this identity to query
const appAdmin = config.appAdmin;

async function requestQuery(func, args) {
  let networkObj = await network.connectToNetwork(appAdmin);
  let response = await network.invoke(networkObj, true, func, args);
  return await JSON.parse(response);
}

module.exports = {
  // Get all assets in world state
  queryAll: async () => requestQuery('queryAll', ''),
  // Query for certain objects within the world state
  queryWithQueryString: async (selected) => requestQuery('queryByObjectType', selected),
  // Query for certain objects within the world state
  queryByKey: async (key) => requestQuery('readMyAsset', key)
}