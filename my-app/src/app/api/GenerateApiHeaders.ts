import { type RawAxiosRequestHeaders } from 'axios'

const GenerateTokenHeader = (token: string | null): RawAxiosRequestHeaders => {
  return ({
    Authorization: token !== null ? 'Bearer ' + token : ''
  })
}

export default GenerateTokenHeader
