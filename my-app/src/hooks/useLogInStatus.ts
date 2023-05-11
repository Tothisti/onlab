import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { clearStatus } from '../features/authSlice'
import { useAppDispatch, type RootState } from '../app/store'
import { useTranslation } from 'react-i18next'

const useLogInStatus = (): boolean => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useAppDispatch()
  const loginStatus = useSelector((state: RootState) => state.login.status)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (loginStatus === 'succeeded') {
      setIsLoading(false)
      enqueueSnackbar(t('success'), { variant: 'success' })
    }

    if (loginStatus === 'loading') {
      setIsLoading(true)
    }

    if (loginStatus === 'failed') {
      setIsLoading(false)
      enqueueSnackbar(t('Username or password is incorrect'), { variant: 'error' })
      dispatch(clearStatus())
    }
  }, [loginStatus])

  return isLoading
}

export default useLogInStatus
