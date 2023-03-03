import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next'
import LanguageSwitcherPanel from '../components/LanguageSwitcherPanel'
import { useSelector } from 'react-redux'
import { loginUser, selectUser } from '../features/auth/authSlice'
import Box from '@material-ui/core/Box'
import { useNavigate } from 'react-router'
import { useSnackbar } from 'notistack'
import { useAppDispatch, type RootState } from '../app/store'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((_theme) =>
  createStyles(
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
)

const Login: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const user = useSelector(selectUser)
  const [usern, setUserName] = useState('')
  const [passw, setPassword] = useState('')
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const loginStatus = useSelector((state: RootState) => state.login.status)

  if (user !== null) navigate('/')

  const onClickHandler = (): void => {
    dispatch(loginUser({ usern, passw }))
      .then((data) => {
        enqueueSnackbar(
          'Sikerült a belépés',
          {
            variant: 'success',
            transitionDuration: { enter: 200, exit: 190 },
            autoHideDuration: 4000
          }
        )
      })
      .catch(() => { console.log('hmmm') })
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
            color="secondary"
            onClick={onClickHandler}
            disabled={loginStatus === 'loading'}
          >
            {loginStatus === 'loading' ? <CircularProgress size={24} color='secondary'/> : t('login')}
          </Button>
        </Box>
      </Paper>
  )
}

export default Login
