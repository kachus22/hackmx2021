'use strict';

class Registrar {
  /**
   *
   * Registrar
   *
   * Constructor for a Voter object. Voter has a voterId and registrar that the
   * voter is .
   *
   * @param registrarId - unique Id for the reigstrar
   * @param country - country where it's located
   * @param state - state where it's located
   * @param locality - locality where it's located
   * @param district - district where it's located
   * @param name - name to identify (must be unique)
   * @param address - location where it is
   *
   * @returns - registrar object
   */
  constructor(registrarId, country, state, locality, district, name, address) {
    this.registrarId = `Registrar:${registrarId}`;
    this.country = country;
    this.state = state;
    this.locality = locality;
    this.district = district;
    this.name = name;
    this.address = address;
    this.type = 'registrar';
    if (this.__isContract) {
      delete this.__isContract;
    }
    return this;
  }
}
module.exports = Registrar;
