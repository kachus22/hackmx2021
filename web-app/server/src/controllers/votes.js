
const util = require('util');

const network = require('../fabric/network.js');
const { config } = require('./services/config');

// Use this identity to query
const appAdmin = config.appAdmin;

module.exports = {
  getCurrentStanding: async (req, res) => {

    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'queryByObjectType', 'votableItem');
    let parsedResponse = await JSON.parse(response);
    console.log(parsedResponse);
    res.send(parsedResponse);
  
  },
  // Vote for some candidates. This will increase the vote count for the votable objects
  castBallot: async (req, res) => {
    let networkObj = await network.connectToNetwork(req.body.voterId);
  
    if (networkObj.error) {
      res.send({ error: networkObj.error});
    } else {
      console.log('util inspecting');
      console.log(util.inspect(networkObj));
      let args = [JSON.stringify(req.body)];
  
      let response = await network.invoke(networkObj, false, 'castVote', args);
      if (response.error) {
        res.send(response.error);
      } else {
        console.log('response: ');
        console.log(response);
        // let parsedResponse = await JSON.parse(response);
        res.send(response);
      }
    }
  }
}
