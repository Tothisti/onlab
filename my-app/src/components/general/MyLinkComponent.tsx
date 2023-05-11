import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, makeStyles, type TypographyProps, createStyles } from '@material-ui/core'

interface MyLinkComponentProps extends TypographyProps {
  to: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    linkText: {
      textDecoration: 'none',
      color: theme.palette.neutral.n900
    }
  })
)
const MyLinkComponent = (props: MyLinkComponentProps): JSX.Element => {
  const {
    to,
    children
  } = props
  const classes = useStyles()
  return (
    <Typography
      component={Link}
      to={to}
      className={classes.linkText}
    >
      {children}
    </Typography>
  )
}

export default MyLinkComponent
