const network = require('../fabric/network.js');

module.exports = {
  // Get all assets in world state
  queryAll:  async (req, res) => {
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'queryAll', '');
    let parsedResponse = await JSON.parse(response);
    res.send(parsedResponse);
  },
  // Query for certain objects within the world state
  queryWithQueryString: async (req, res) => {
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'queryByObjectType', req.body.selected);
    let parsedResponse = await JSON.parse(response);
    res.send(parsedResponse);
  },
  // Query for certain objects within the world state
  queryByKey: async (req, res) => {
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'readMyAsset', req.body.key);
    response = JSON.parse(response);
    if (response.error) {
      res.send(response.error);
    } else {
      res.send(response);
    }
  }
}


