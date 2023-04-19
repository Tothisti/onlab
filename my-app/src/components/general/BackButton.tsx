import React from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BackButton: React.FC = (): JSX.Element => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => { navigate(-1) } }
    >
      {t('back')}
    </Button>
  )
}

export default BackButton
