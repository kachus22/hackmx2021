const util = require('util');

const network = require('../fabric/network.js');

module.exports = {
  //get voter info, create voter object, and update state with their voterId
  registerVoter: async (req, res) => {
    let voterId = req.body.voterId;

    //first create the identity for the voter and add to wallet
    let response = await network.registerVoter(voterId, req.body.registrarId, req.body.firstName, req.body.lastName);
    if (response.error) {
      res.send(response.error);
    } else {
      let networkObj = await network.connectToNetwork(voterId);

      if (networkObj.error) {
        res.send({ error: networkObj.error});
      } else {
        // console.log('network obj');
        // console.log(util.inspect(networkObj));

        let args = [JSON.stringify(req.body)];

        // Connect to network and update the state with voterId
        let invokeResponse = await network.invoke(networkObj, false, 'createVoter', args);
        
        if (invokeResponse.error) {  
          res.send(invokeResponse.error);
        } else {
          let parsedResponse = invokeResponse.toString();
          parsedResponse += '. Use voterId to login above.';
          res.send(parsedResponse);
        }
      }
    }
  },
  // Used as a way to login the voter to the app and make sure they haven't voted before 
  validateVoter: async (req, res) => {
    let networkObj = await network.connectToNetwork(req.body.voterId);
    // console.log('networkobj: ');
    // console.log(util.inspect(networkObj));

    if (networkObj.error) {
      res.send(networkObj);
    } else {
      let invokeResponse = await network.invoke(networkObj, true, 'readMyAsset', req.body.voterId);

      if (invokeResponse.error) {
        res.send(invokeResponse);
      } else {
        let parsedResponse = await JSON.parse(invokeResponse);
        if (parsedResponse.ballotCast) {
          let response = { error: 'This voter has already cast a ballot, we cannot allow double-voting!'};
          res.send(response);
        }
        // let response = `Voter with voterId ${parsedResponse.voterId} is ready to cast a ballot.`  
        res.send(parsedResponse);
      }
    }
  }
}