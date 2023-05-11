import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MyCustomButton from './MyCustomButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const BackButton: React.FC = (): JSX.Element => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const onClickHandler = useCallback(() => {
    navigate(-1)
  }, [])
  return (
    <MyCustomButton
      variant='contained'
      color='primary'
      size='small'
      startIcon={<ArrowBackIcon />}
      onClick={onClickHandler}
    >
      {t('back')}
    </MyCustomButton>
  )
}

export default BackButton
