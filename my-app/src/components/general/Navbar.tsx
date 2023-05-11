import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LogoutButton from '../auth/LogoutButton'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/authSlice'
import BackButton from './BackButton'
import LanguageSwitcherPanel from './LanguageSwitcherPanel'

const useStyles = makeStyles({
  navbar: {
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px'
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px'
  }
})

const CheckUserIsLoggedIn = (user: string | null): JSX.Element | undefined => {
  if (user !== null) {
    return <LogoutButton />
  }
}

const Navbar = (): JSX.Element => {
  const classes = useStyles()
  const user = useSelector(selectUser)

  return (
    <nav className={classes.navbar}>
      <div><LanguageSwitcherPanel /></div>
      <div className={classes.buttonContainer}>
        <BackButton />
        {CheckUserIsLoggedIn(user)}
      </div>
    </nav>
  )
}

export default Navbar
