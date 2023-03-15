import { type RawAxiosRequestHeaders } from 'axios'
interface Parameters {
  token: string | null
}

const GenerateHeaders = ({ token }: Parameters): RawAxiosRequestHeaders => {
  return ({
    Authorization: token !== null ? 'Bearer ' + token : ''
  })
}

export default GenerateHeaders
