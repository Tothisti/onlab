import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next'
import LanguageSwitcherPanel from '../components/LanguageSwitcherPanel'

const useStyles = makeStyles((theme) =>
  createStyles(
    {
      root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'gray'
      },
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

  return (
    <Box className={classes.root}>
      <Paper className={classes.loginPanel} elevation={5}>
        <LanguageSwitcherPanel />
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            id="username"
            label={t('validation:username')}
            variant='outlined'
            margin='normal'
          />
          <TextField
            className={classes.textField}
            id="username"
            label={t('validation:password')}
            variant='outlined'
            margin='normal'
            type='password'
          />
          <Button
            type='submit'
            variant='contained'
            color="secondary"
          >
            {t('validation:login')}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
