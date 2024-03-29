import { Button } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/authSlice'

const LogoutButton: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const onClickHandler = (): void => {
    dispatch(logoutUser())
  }

  return (
        <Button
            variant='contained'
            color='primary'
            onClick={onClickHandler}
        >
            {t('logout')}
        </Button>)
}

export default LogoutButton
