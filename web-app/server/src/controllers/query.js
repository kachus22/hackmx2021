const network = require('../fabric/network');
const queryService = require('../services/query');

module.exports = {
  // Get all assets in world state
  queryAll:  async (req, res) => {
    const parsedResponse = await queryService.queryAll(); 
    res.send(parsedResponse);
  },
  // Query for certain objects within the world state
  queryWithQueryString: async (req, res) => {
    const parsedResponse = await queryService.queryWithQueryString(req.body.selected); 
    res.send(parsedResponse);
  },
  // Query for certain objects within the world state
  queryByKey: async (req, res) => {
    const parsedResponse = await queryService.queryByKey(req.body.key); 
    let response = JSON.parse(parsedResponse);
    if (response.error) {
      res.send(response.error);
    } else {
      res.send(response);
    }
  }
}
