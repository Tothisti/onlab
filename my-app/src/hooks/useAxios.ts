import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectToken } from '../features/authSlice'
import { type RawAxiosRequestHeaders } from 'axios'
import myAxios from '../app/api/axiosInstance'
import GenerateHeaders from '../app/api/GenerateApiHeaders'

interface UseAxiosProps {
  resourcePath: string
  HTTPMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: RawAxiosRequestHeaders
  HTTPBody?: object
}
type loadingStateType = 'idle' | 'loading' | 'succeeded' | 'failed'

const useAxios = <T>(props: UseAxiosProps): [result: T | null, loadingState: loadingStateType] => {
  const {
    resourcePath,
    HTTPMethod,
    headers,
    HTTPBody
  } = props

  const [result, setResult] = useState<T | null>(null)
  const [loadingState, setLoadingState] = useState<loadingStateType>('idle')
  const token = useSelector(selectToken)
  useEffect(() => {
    if (token === null || typeof token === 'undefined') {
      setLoadingState('failed')
      setResult(null)
    } else {
      if (HTTPMethod === 'GET') {
        setLoadingState('loading')
        myAxios.get<T>(
          resourcePath,
          {
            headers: {
              ...GenerateHeaders(token),
              ...headers
            }
          })
          .then((res) => {
            setResult(res.data)
            setLoadingState('succeeded')
          })
          .catch((e) => {
            setResult(null)
            setLoadingState('failed')
          })
      }
      if (HTTPMethod === 'POST') {
        setLoadingState('loading')
        myAxios.post(
          resourcePath,
          HTTPBody
          ,
          {
            headers: {
              ...GenerateHeaders(token),
              ...headers
            }
          })
          .then((res) => {
            setResult(res.data)
            setLoadingState('succeeded')
          })
          .catch((e) => {
            setResult(null)
            setLoadingState('failed')
          })
      }
    }
  }, [resourcePath])

  return [result, loadingState]
}

export default useAxios
