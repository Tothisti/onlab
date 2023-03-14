import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles } from '@material-ui/core/styles'

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
        >Hello
        </Typography>
        <Link to={'/kitting-dashboard'}>Kitting dashboard</Link>
        <Link to={'/kitting-maintance'}>Kitting maintance</Link>
      </Grid>
    </Paper>
  )
}

export default Menu
