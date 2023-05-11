import React from 'react'
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
const useStyles = makeStyles((theme) =>
  createStyles(
    {
      root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }
    }
  )
)

const HomeLayout: React.FC = () => {
  const classes = useStyles()
  return (
    <Box style={{ height: '100%', width: '100%' }}>
      <Navbar />
      <Box className={classes.root}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default HomeLayout
