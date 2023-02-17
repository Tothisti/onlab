import React from 'react'
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Outlet } from 'react-router'

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
      }
    }
  )
)

const HomeLayout: React.FC = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
        <Outlet />
    </Box>
  )
}

export default HomeLayout
