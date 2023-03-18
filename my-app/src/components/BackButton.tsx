import React from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const BackButton: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => { navigate(-1) } }
    >BACK
    </Button>
  )
}

export default BackButton
