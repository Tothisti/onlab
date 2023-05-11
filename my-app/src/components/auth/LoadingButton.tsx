import React, { useMemo } from 'react'
import { Button, type ButtonProps, CircularProgress } from '@material-ui/core'

interface LoadingButtonProps extends ButtonProps {
  text: string
  onClickHandler: () => void
  isLoading: boolean
}

const LoadingButton = (props: LoadingButtonProps): JSX.Element => {
  const {
    text,
    onClickHandler,
    isLoading,
    ...restProps
  } = props

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onClickHandler}
      disabled={isLoading}
      {...restProps}
    >
      {isLoading ? <CircularProgress size={24} color='primary' /> : text}
    </Button>
  )
}

export default LoadingButton
