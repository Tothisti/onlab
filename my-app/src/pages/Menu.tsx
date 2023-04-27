import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

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

const Menu: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Paper className={classes.loginPanel} elevation={5}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant='h1'
        >
          {t('menu')}
        </Typography>
        <Link to={'/kitting-dashboard'}>{t('kittingDashboard')}</Link>
        <Link to={'/kitting-maintance'}>{t('kitCartMaintance')}</Link>
      </Grid>
    </Paper>
  )
}

export default Menu
