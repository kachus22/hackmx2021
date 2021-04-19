/* eslint-disable indent */
'use strict';

class VotableItem {

    /**
   *
   * VotableItem
   *
   * Constructor for a VotableItem object. These will eventually be placed on the
   * ballot.
   *
   * @param ctx - the context of the transaction
   * @param votableId - the Id of the votableItem
   * @param candidates - the candidates for this votableItem
   * @returns - registrar object
   */
  constructor(ctx, votableId, candidates) {

    this.votableId = `VotableId:${votableId}`;
    this.candidates = candidates;
    this.count = 0;
    this.type = 'votableItem';
    if (this.__isContract) {
      delete this.__isContract;
    }
    return this;

  }
}
module.exports = VotableItem;
