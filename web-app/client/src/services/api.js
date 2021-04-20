import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8081`
  })
}

export const AuthApi = () => {
  const token = localStorage.getItem('user-token');
  console.log(token);
  return axios.create({
    baseURL: `http://localhost:8081`,
    headers: {'Authorization': `Bearer ${token}` }
  })
}