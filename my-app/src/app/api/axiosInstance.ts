import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'https://localhost:5001/api/'
})

export default myAxios
