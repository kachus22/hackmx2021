'use strict';

class Election {
  /**
   *
   * Election
   *
   * Constructor for an Election object. Specifies start and end date.
   *
   * @param name - the name of the election
   * @param country - country where the election is located
   * @param year - year corresponding to the election
   * @param startDate - date when the election starts to accept votes
   * @param endDate - date when the election ends to accept votes
   * @returns - registrar object
   */
  constructor(name, country, year, startDate, endDate) {
    this.electionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    if (this.validateElection(this.electionId)) {
      //create the election object
      this.name = name;
      this.country = country;
      this.year = year;
      this.startDate = startDate;
      this.endDate = endDate;
      this.type = 'election';
      if (this.__isContract) {
        delete this.__isContract;
      }
      return this;

    } else {
      throw new Error('not a valid election!');
    }
  }

  /**
   *
   * validateElection
   *
   * check for valid election, cross check with government. Don't want duplicate
   * elections.
   *
   * @param electionId - an array of choices
   * @returns - yes if valid Voter, no if invalid
   */
  async validateElection(electionId) {
    //registrarId error checking here, i.e. check if valid drivers License, or state ID
    if (electionId) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = Election;
