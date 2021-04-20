import Api, { AuthApi } from '@/services/api'

export default {
  books() {
    return AuthApi().get('ping');
  },
  queryAll() {
    return Api().get('queryAll')
  },
  queryByObjectType() {
    return Api().get('queryByObjectType')
  },
  queryWithQueryString(selected) {
    return Api().post('queryWithQueryString', {
      selected: selected
    }) 
  },
  queryByKey(key) {
    return Api().post('queryByKey', {
      key: key
    }) 
  },
  registerVoter(voterId, registrarId, firstName, lastName) {
    return Api().post('registerVoter', {
      voterId: voterId,
      registrarId: registrarId,
      firstName: firstName,
      lastName: lastName,
      
    }) 
  },
  validateVoter(voterId) {
    return Api().post('validateVoter', {
      voterId: voterId
    }) 
  },
  getCurrentStanding() {
    return Api().get('getCurrentStanding')
  },
  castBallot(electionId, voterId, picked) {
    return Api().post('castBallot', {       
      electionId: electionId,
      voterId: voterId,
      picked: picked
    })
  },
}