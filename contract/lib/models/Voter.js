'use strict';

class Voter {
  /**
   *
   * Voter
   *
   * Constructor for a Voter object. Voter has a voterId and registrar that the
   * voter is .
   *
   * @param ctx - the context of the transaction
   * @param voterId - the unique Id which corresponds to a registered voter
   * @param registrarId - the unique Id which corresponds to a registrar where the voter is assigned
   * @param firstName - first name of the voter
   * @param lastName - last name of the voter
   * @returns - registrar object
   */
  constructor(ctx, voterId, registrarId, firstName, lastName) {
    if (this.validateVoter(voterId) && this.validateRegistrar(ctx, registrarId)) {
      this.voterId = `Voter:${voterId}`;
      this.registrarId = registrarId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.ballotCreated = false;
      this.type = 'voter';
      if (this.__isContract) {
        delete this.__isContract;
      }
      if (this.name) {
        delete this.name;
      }
      return this;

    } else if (!this.validateVoter(voterId)){
      throw new Error('the voterId is not valid.');
    } else {
      throw new Error('the registrarId is not valid.');
    }

  }

  /**
   *
   * validateVoter
   *
   * check for valid ID card - stateID or drivers License.
   *
   * @param voterId - an array of choices
   * @returns - yes if valid Voter, no if invalid
   */
  async validateVoter(voterId) {
    //VoterId error checking here, i.e. check if valid drivers License, or state ID
    if (voterId) {
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * validateRegistrar
   *
   * check for valid registrarId, should be cross checked with government
   *
   * @param ctx - the context of the transaction
   * @param voterId - an array of choices
   * @returns - yes if valid Voter, no if invalid
   */
  async validateRegistrar(ctx, registrarId) {
    const buffer = await ctx.stub.getState(registrarId);

    if (!!buffer && buffer.length > 0) {
      let registrar = JSON.parse(buffer.toString());
      // TODO: Maybe add some validation about the registrar
      return registrar !== null;
    } else {
      console.log('This ID is not registered to vote.');
      return false;
    }
  }
}
module.exports = Voter;
