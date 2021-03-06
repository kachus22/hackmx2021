'use strict';

class Ballot {

  /**
   *
   * Ballot
   *
   * Constructor for a Ballot object. This is what the point of the application is - create
   * ballots, have a voter fill them out, and then tally the ballots.
   *
   * @param ctx - the context of the transaction
   * @param items - an array of choices
   * @param electionId - what election you are making ballots for
   * @param voterId - the unique Id which corresponds to a registered voter
   * @returns - ballot object
   */
  constructor(ctx, items, electionId, voterId) {
    if (this.validateBallot(ctx, voterId)) {
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.ballotId = `Ballot:${id}`;
      this.votableItems = items;
      this.electionId = electionId;
      this.voterId = voterId;
      this.ballotCast = false;
      this.type = 'ballot';
      if (this.__isContract) {
        delete this.__isContract;
      }
      if (this.name) {
        delete this.name;
      }
      return this;

    } else {
      console.log('a ballot has already been created for this voter');
      throw new Error ('a ballot has already been created for this voter');
    }
  }

  /**
   *
   * validateBallot
   *
   * check to make sure a ballot has not been created for this
   * voter.
   *
   * @param voterId - the unique Id for a registered voter
   * @returns - yes if valid Voter, no if invalid
   */
  async validateBallot(ctx, voterId) {
    const buffer = await ctx.stub.getState(voterId);

    if (!!buffer && buffer.length > 0) {
      let voter = JSON.parse(buffer.toString());
      if (voter.ballotCreated) {
        console.log('ballot has already been created for this voter');
        return false;
      } else {
        return true;
      }
    } else {
      console.log('This ID is not registered to vote.');
      return false;
    }
  }
}
module.exports = Ballot;
