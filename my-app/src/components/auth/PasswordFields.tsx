import React, { useCallback, useState } from 'react'
import { TextField, InputAdornment, IconButton, type TextFieldProps } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const PasswordField = (props: TextFieldProps): JSX.Element => {
  const { ...restProps } = props
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = useCallback((): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }, [setShowPassword])

  return (
    <TextField
      {...restProps}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleTogglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default PasswordField
