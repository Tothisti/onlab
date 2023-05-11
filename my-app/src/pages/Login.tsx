import React, { useCallback, useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { loginUser, selectUser } from '../features/authSlice'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../app/store'
import { createStyles, withStyles, type WithStyles } from '@material-ui/core/styles'
import LoadingButton from '../components/auth/LoadingButton'
import useLogInStatus from '../hooks/useLogInStatus'
import { Avatar, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'

const styles = createStyles(
  {
    loginPanel: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '70vh',
      maxWidth: '500px',
      maxHeight: '500px',
      minHeight: '300px',
      margin: '16px',
      padding: '16px'
    },
    form: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    textField: {
      width: '100%',
      maxWidth: '300px'
    },
    avatar: {
      margin: 1,
      bgcolor: 'secondary.main'
    },
    loadingButton: {
      marginTop: '4px',
      width: '100%'
    }
  }
)

const Login = (props: WithStyles<typeof styles>): JSX.Element => {
  const { classes } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const user = useSelector(selectUser)
  useEffect(() => {
    if (user !== null) navigate('/', { replace: true })
  })

  const onClickHandler = useCallback((): void => {
    dispatch(loginUser({ username, password }))
      .catch(() => { console.log('') })
  }, [username, password])

  const isLoading = useLogInStatus()

  return (
    <Paper className={classes.loginPanel} elevation={5}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <Typography align='center' variant='body1'>{t('login').toUpperCase()}</Typography>
      <div>
        <form className={classes.form}>
          <TextField
            className={classes.textField}
            id='username'
            label={t('username')}
            variant='outlined'
            margin='normal'
            value={username}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <TextField
            className={classes.textField}
            id='username'
            label={t('password')}
            variant='outlined'
            margin='normal'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          // type='password'
          />
          <LoadingButton
            text={t('login')}
            onClickHandler={onClickHandler}
            isLoading={isLoading}
            className={classes.loadingButton}
          />
        </form>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(Login)
