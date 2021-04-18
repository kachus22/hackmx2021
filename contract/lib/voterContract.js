/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

//import Hyperledger Fabric 1.4 SDK
const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');

//import our file which contains our constructors and auxiliary function
let Ballot = require('./models/Ballot.js');
let Election = require('./models/Election.js');
let Registrar = require('./models/Registrar.js');
let VotableItem = require('./models/VotableItem.js');
let Voter = require('./models/Voter.js');

/**
   *
   * loadJsonData
   *
   * This function helps load JSON data from disk and parse it into an object
   *
   * @param filepath - the filepath where the data is
   * @returns the object containing that data
   */
function loadJsonData(filepath) {
    const dataPath = path.join(process.cwd(), filepath);
    const dataJson = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(dataJson);
}


// connect to the data files
const electionData = loadJsonData('./lib/data/electionData.json');
const ballotData = loadJsonData('./lib/data/ballotData.json');
const registrarData = loadJsonData('./lib/data/registrarData.json');

class MyAssetContract extends Contract {

  /**
   *
   * init
   *
   * This function creates voters and gets the application ready for use by creating
   * an election from the data files in the data directory.
   *
   * @param ctx - the context of the transaction
   * @returns the voters which are registered and ready to vote in the election
   */
  async init(ctx) {
    // Initialize election
    let election = await this.getOrGenerateElection(ctx);
    let registrars = await this.generateRegistrars(ctx);
    let voters = [];


    //create voters
    let voter1 = await new Voter('V1', '234', 'Horea', 'Porutiu');
    let voter2 = await new Voter('V2', '345', 'Duncan', 'Conley');

    //update voters array
    voters.push(voter1);
    voters.push(voter2);

    //add the voters to the world state, the election class checks for registered voters
    await ctx.stub.putState(voter1.voterId, Buffer.from(JSON.stringify(voter1)));
    await ctx.stub.putState(voter2.voterId, Buffer.from(JSON.stringify(voter2)));

    let votableItems = await this.generateVotableItems(ctx, ballotData);
    //generate ballots for all voters
    for (let i = 0; i < voters.length; i++) {
      if (!voters[i].ballot) {
        //give each registered voter a ballot
        await this.generateBallot(ctx, votableItems, election, voters[i]);
      } else {
        console.log('these voters already have ballots');
        break;
      }
    }
    return voters;
  }

  /**
   *
   * getOrGenerateElection
   *
   * Gets or creates the Election to be used for this
   *
   * @param ctx - the context of the transaction
   * @returns - The election that we are trying to use
   */
   async getOrGenerateElection (ctx) {
    //query for election first before creating one.
    let currElections = JSON.parse(await this.queryByObjectType(ctx, 'election'));
    let election;

    if (currElections.length === 0) {
      // TODO: Improve Date handling. Maybe using Luxon.
      let electionDate = electionData.date;
      let electionStartDate = await new Date(electionDate.start.year, electionDate.start.month,
      electionDate.start.day, electionDate.start.hour, electionDate.start.minute);
      let electionEndDate = await new Date(electionDate.end.year, electionDate.end.month,
      electionDate.end.day, electionDate.end.hour, electionDate.end.minute);

      //create the election
      election = await new Election(electionData.name, electionData.country,
      electionDate.start.year, electionStartDate, electionEndDate);

      //update elections array
      elections.push(election);

      await ctx.stub.putState(election.electionId, Buffer.from(JSON.stringify(election)));
    } else {
      election = currElections[0];
    }
    return election;
  }

  /**
   *
   * generateRegistrars
   *
   * Generates the registrars which are where people is assigned to vote on.
   *
   * @param ctx - the context of the transaction
   * @returns - The registrars for the election
   */
  async generateRegistrars (ctx) {
    //create registrars
    let registrars = await Promise.all(
      //populate registrars array so that the voters can be in one of them
      registrarData.map((x, i) => new Registrar(
        i, x.country, x.state, x.locality, x.district, x.name, x.address
      ))
    );

    await Promise.all(registrars.map((x) => {
      //save votable choices in world state
      ctx.stub.putState(x.votableId, Buffer.from(JSON.stringify(x)));
    }));
    return registrars;
  }

  /**
   *
   * generateVotableItems
   *
   * Creates the votables items available in the world state
   *
   * @param ctx - the context of the transaction
   * @returns - The different political parties and candidates you can vote for, which are on the ballot.
   */
  async generateVotableItems(ctx) {
    //create votableItems for the ballots
    let votableItems = await Promise.all(
        //populate choices array so that the ballots can have all of these choices
        ballotData.map((x) => new VotableItem(ctx, x.id, x.brief))
    );

    await Promise.all(votableItems.map((x) => {
        //save votable choices in world state
        ctx.stub.putState(x.votableId, Buffer.from(JSON.stringify(x)));
    }));
    return votableItems;
  }

  /**
   *
   * generateBallot
   *
   * Creates a ballot in the world state, and updates voter ballot and castBallot properties.
   *
   * @param ctx - the context of the transaction
   * @param votableItems - The different political parties and candidates you can vote for, which are on the ballot.
   * @param election - the election we are generating a ballot for. All ballots are the same for an election.
   * @param voter - the voter object
   * @returns - nothing - but updates the world state with a ballot for a particular voter object
   */
  async generateBallot(ctx, votableItems, election, voter) {
    //generate ballot
    let ballot = await new Ballot(ctx, votableItems, election, voter.voterId);

    //set reference to voters ballot
    voter.ballot = ballot.ballotId;
    voter.ballotCreated = true;

    //update state with ballot object we just created
    await ctx.stub.putState(ballot.ballotId, Buffer.from(JSON.stringify(ballot)));
    await ctx.stub.putState(voter.voterId, Buffer.from(JSON.stringify(voter)));
  }


  /**
   *
   * createVoter
   *
   * Creates a voter in the world state, based on the args given.
   *
   * @param args.voterId - the Id the voter, used as the key to store the voter object
   * @param args.registrarId - the registrar the voter is registered for
   * @param args.firstName - first name of voter
   * @param args.lastName - last name of voter
   * @returns - nothing - but updates the world state with a voter
   */
  async createVoter(ctx, args) {

    args = JSON.parse(args);

    //create a new voter
    let newVoter = await new Voter(args.voterId, args.registrarId, args.firstName, args.lastName);

    //update state with new voter
    await ctx.stub.putState(newVoter.voterId, Buffer.from(JSON.stringify(newVoter)));

    //query state for elections
    let currElections = JSON.parse(await this.queryByObjectType(ctx, 'election'));

    if (currElections.length === 0) {
      let response = {};
      response.error = 'no elections. Run the init() function first.';
      return response;
    }

    //get the election that is created in the init function
    let currElection = currElections[0];

    let votableItems = JSON.parse(await this.queryByObjectType(ctx, 'votableItem'));

    //generate ballot with the given votableItems
    await this.generateBallot(ctx, votableItems, currElection, newVoter);

    let response = `voter with voterId ${newVoter.voterId} is updated in the world state`;
    return response;
  }



  /**
   *
   * deleteMyAsset
   *
   * Deletes a key-value pair from the world state, based on the key given.
   *
   * @param myAssetId - the key of the asset to delete
   * @returns - nothing - but deletes the value in the world state
   */
  async deleteMyAsset(ctx, myAssetId) {
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists) {
      throw new Error(`The my asset ${myAssetId} does not exist`);
    }

    await ctx.stub.deleteState(myAssetId);
  }

  /**
   *
   * readMyAsset
   *
   * Reads a key-value pair from the world state, based on the key given.
   *
   * @param myAssetId - the key of the asset to read
   * @returns - nothing - but reads the value in the world state
   */
  async readMyAsset(ctx, myAssetId) {
    const exists = await this.myAssetExists(ctx, myAssetId);

    if (!exists) {
      // throw new Error(`The my asset ${myAssetId} does not exist`);
      let response = {};
      response.error = `The my asset ${myAssetId} does not exist`;
      return response;
    }

    const buffer = await ctx.stub.getState(myAssetId);
    const asset = JSON.parse(buffer.toString());
    return asset;
  }



  /**
   *
   * myAssetExists
   *
   * Checks to see if a key exists in the world state.
   * @param myAssetId - the key of the asset to read
   * @returns boolean indicating if the asset exists or not.
   */
  async myAssetExists(ctx, myAssetId) {
    const buffer = await ctx.stub.getState(myAssetId);
    return (!!buffer && buffer.length > 0);
  }

  /**
   *
   * castVote
   *
   * First to checks that a particular voterId has not voted before, and then
   * checks if it is a valid election time, and if it is, we increment the
   * count of the political party that was picked by the voter and update
   * the world state.
   *
   * @param electionId - the electionId of the election we want to vote in
   * @param voterId - the voterId of the voter that wants to vote
   * @param votableId - the Id of the candidate the voter has selected.
   * @returns an array which has the winning briefs of the ballot.
   */
  async castVote(ctx, args) {
    args = JSON.parse(args);

    //get the political party the voter voted for, also the key
    let votableId = args.picked;

    //check to make sure the election exists
    let electionExists = await this.myAssetExists(ctx, args.electionId);

    if (electionExists) {

      //make sure we have an election
      let electionAsBytes = await ctx.stub.getState(args.electionId);
      let election = await JSON.parse(electionAsBytes);
      let voterAsBytes = await ctx.stub.getState(args.voterId);
      let voter = await JSON.parse(voterAsBytes);

      if (voter.ballotCast) {
        let response = {};
        response.error = 'this voter has already cast this ballot!';
        return response;
      }

      //check the date of the election, to make sure the election is still open
      let currentTime = await new Date(2020, 11, 3);

      //parse date objects
      let parsedCurrentTime = await Date.parse(currentTime);
      let electionStart = await Date.parse(election.startDate);
      let electionEnd = await Date.parse(election.endDate);

      //only allow vote if the election has started
      if (parsedCurrentTime >= electionStart && parsedCurrentTime < electionEnd) {

        let votableExists = await this.myAssetExists(ctx, votableId);
        if (!votableExists) {
          let response = {};
          response.error = 'VotableId does not exist!';
          return response;
        }

        //get the votable object from the state - with the votableId the user picked
        let votableAsBytes = await ctx.stub.getState(votableId);
        let votable = await JSON.parse(votableAsBytes);

        //increase the vote of the political party that was picked by the voter
        await votable.count++;

        //update the state with the new vote count
        let result = await ctx.stub.putState(votableId, Buffer.from(JSON.stringify(votable)));
        console.log(result);

        //make sure this voter cannot vote again!
        voter.ballotCast = true;
        voter.picked = {};
        voter.picked = args.picked;

        //update state to say that this voter has voted, and who they picked
        let response = await ctx.stub.putState(voter.voterId, Buffer.from(JSON.stringify(voter)));
        console.log(response);
        return voter;

      } else {
        let response = {};
        response.error = 'the election is not open now!';
        return response;
      }

    } else {
      let response = {};
      response.error = 'the election or the voter does not exist!';
      return response;
    }
  }

  /**
   * Query and return all key value pairs in the world state.
   *
   * @param {Context} ctx the transaction context
   * @returns - all key-value pairs in the world state
  */
  async queryAll(ctx) {

    let queryString = {
      selector: {}
    };

    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }

  /**
     * Evaluate a queryString
     *
     * @param {Context} ctx the transaction context
     * @param {String} queryString the query string to be evaluated
    */
  async queryWithQueryString(ctx, queryString) {

    console.log('query String');
    console.log(JSON.stringify(queryString));

    let resultsIterator = await ctx.stub.getQueryResult(queryString);

    let allResults = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let res = await resultsIterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};

        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;

        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }

        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await resultsIterator.close();
        console.info(allResults);
        console.log(JSON.stringify(allResults));
        return JSON.stringify(allResults);
      }
    }
  }

  /**
  * Query by the main objects in this app: ballot, election, votableItem, and Voter.
  * Return all key-value pairs of a given type.
  *
  * @param {Context} ctx the transaction context
  * @param {String} objectType the type of the object - should be either ballot, election, votableItem, or Voter
  */
  async queryByObjectType(ctx, objectType) {

    let queryString = {
      selector: {
        type: objectType
      }
    };

    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }
}
module.exports = MyAssetContract;
