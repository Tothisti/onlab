import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import SearchingPanel from '../components/kittingDashboard/SearchingPanel'
import MatrixPanel from '../components/kittingDashboard/MatrixPanel'

const useStyles = makeStyles((_theme) =>
  createStyles(
    {
      layout: {
        width: '100%',
        padding: '15px',
        backgroundColor: '#f1f1f1'
      }
    }
  )
)

const KittingDashboard: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.layout}>
      <SearchingPanel />
      <MatrixPanel />
    </Box>
  )
}

export default KittingDashboard
