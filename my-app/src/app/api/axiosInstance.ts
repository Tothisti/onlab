import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'https://localhost:5001/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

myAxios.interceptors.request.use((config) => {
  const loginState = sessionStorage.getItem('persist:login')
  if (loginState === null || typeof loginState === 'undefined') return config

  // need regex because of redux-persist library
  const token: string = JSON.parse(loginState).token.replace(/(^"|"$)/g, '')
  if (token !== 'null') config.headers.Authorization = 'Bearer ' + token
  return config
})

export default myAxios
