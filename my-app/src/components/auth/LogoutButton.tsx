import { Button } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/authSlice'
import MyCustomButton from '../general/MyCustomButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const LogoutButton: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const onClickHandler = useCallback((): void => {
    dispatch(logoutUser())
  }, [])

  return (
        <MyCustomButton
            variant='outlined'
            color='primary'
            startIcon={<ExitToAppIcon />}
            onClick={onClickHandler}
        >
            {t('logout')}
        </MyCustomButton>)
}

export default LogoutButton
