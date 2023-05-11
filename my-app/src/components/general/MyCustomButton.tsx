import React from 'react'
import Button, { type ButtonProps } from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(1, 2),
      borderRadius: theme.spacing(1),
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: '0 3px 4px rgba(0, 0, 0, 0.2)'
      }
    }
  })
)

const MyCustomButton = (props: ButtonProps): JSX.Element => {
  const classes = useStyles()
  const { children, ...restProps } = props
  return (
    <Button
      {...restProps}
      className={classes.root}
    >
      {children}
    </Button>
  )
}

export default MyCustomButton
