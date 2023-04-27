import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectToken } from '../features/authSlice'
import { type RawAxiosRequestHeaders } from 'axios'
import myAxios from '../app/api/axiosInstance'
import GenerateHeaders from '../app/api/GenerateApiHeaders'

export interface UseAxiosProps {
  resourcePath: string
  HTTPMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: RawAxiosRequestHeaders
  HTTPBody?: string
  autoStart?: boolean
}
type loadingStateType = 'idle' | 'loading' | 'succeeded' | 'failed'
const useAxios = <T>(props: UseAxiosProps): [result: T | null, loadingState: loadingStateType, startFetch: () => void] => {
  const {
    resourcePath,
    HTTPMethod,
    headers,
    HTTPBody,
    autoStart = true
  } = props
  const [result, setResult] = useState<T | null>(null)
  const [loadingState, setLoadingState] = useState<loadingStateType>('idle')
  const token = useSelector(selectToken)
  const [reFectch, setReFetch] = useState<boolean>(autoStart)
  const firstRun = useRef(autoStart)
  useEffect(() => {
    if (firstRun.current) {
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
      } else if (HTTPMethod === 'POST') {
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
    } else firstRun.current = true
  }, [reFectch])
  return [result, loadingState, () => { setReFetch(prev => !prev) }]
}

export default useAxios
