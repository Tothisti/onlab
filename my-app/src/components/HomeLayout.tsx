import React from 'react'
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/auth/authSlice'
import LogoutButton from './auth/LogoutButton'

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
  const user = useSelector(selectUser)
  const classes = useStyles()

  let logout
  if (user !== null) {
    logout = <LogoutButton />
  }

  return (
    <Box style={{ height: '100%', width: '100%' }}>
      <Box>{logout}</Box>
      <Box className={classes.root}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default HomeLayout
