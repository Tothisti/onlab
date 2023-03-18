import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next'
import LanguageSwitcherPanel from '../components/LanguageSwitcherPanel'
import { useSelector } from 'react-redux'
import { clearStatus, loginUser, selectUser } from '../features/auth/authSlice'
import Box from '@material-ui/core/Box'
import { useNavigate } from 'react-router'
import { useSnackbar } from 'notistack'
import { useAppDispatch, type RootState } from '../app/store'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, withStyles, type WithStyles } from '@material-ui/core/styles'

const styles = createStyles(
  {
    loginPanel: {
      height: '500px',
      width: '500px'
    },
    form: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    textField: {
      width: '30ch'
    }
  }
)

const Login: React.FC<WithStyles<typeof styles>> = (props: WithStyles<typeof styles>) => {
  const { classes } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [usern, setUserName] = useState('')
  const [passw, setPassword] = useState('')
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const user = useSelector(selectUser)
  const loginStatus = useSelector((state: RootState) => state.login.status)

  useEffect(() => {
    if (user !== null) navigate('/', { replace: true })
  })

  if (loginStatus === 'succeeded') enqueueSnackbar('siker', { variant: 'success' })
  if (loginStatus === 'failed') {
    enqueueSnackbar('hiba', { variant: 'error' })
    dispatch(clearStatus())
  }

  const onClickHandler = (): void => {
    dispatch(loginUser({ usern, passw })).catch(() => { console.log('hiba') })
  }

  return (
    <Paper className={classes.loginPanel} elevation={5}>
      <LanguageSwitcherPanel />
      <Box className={classes.form}>
        <TextField
          className={classes.textField}
          id="username"
          label={t('username')}
          variant='outlined'
          margin='normal'
          value={usern}
          onChange={(e) => { setUserName(e.target.value) }}
        />
        <TextField
          className={classes.textField}
          id="username"
          label={t('password')}
          variant='outlined'
          margin='normal'
          value={passw}
          onChange={(e) => { setPassword(e.target.value) }}
        // type='password'
        />
        <Button
          variant='contained'
          color="primary"
          onClick={onClickHandler}
          disabled={loginStatus === 'loading' || loginStatus === 'succeeded'}
        >
          {loginStatus === 'loading' ? <CircularProgress size={24} color='primary' /> : t('login')}
        </Button>
      </Box>
    </Paper>
  )
}

export default withStyles(styles)(Login)
