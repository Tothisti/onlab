import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LogoutButton from './auth/LogoutButton'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/auth/authSlice'

const useStyles = makeStyles({
  navbar: {
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px'
  }
})

const Navbar = (): JSX.Element => {
  const classes = useStyles()
  const user = useSelector(selectUser)

  let logout
  if (user !== null) {
    logout = <LogoutButton />
  }

  return (
    <nav className={classes.navbar}>
      <div></div>
      <div></div>
      {logout}
    </nav>
  )
}

export default Navbar
