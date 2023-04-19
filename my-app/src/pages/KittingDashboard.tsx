import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import DasboardDataMatrix from '../components/kittingDashboard/dataTable/DashboardDataMatrix'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Button } from '@material-ui/core'
import { type Row, type Column } from '../components/kittingDashboard/dataTable/DashboardDataMatrix'
import { type DashboardData } from '../models/api/DashboardData'
import useAxios from '../hooks/useAxios'
import { useTranslation } from 'react-i18next'
import SearchingPanel from '../components/kittingDashboard/SearchingPanel'
import { selectPrepArea, selectProdLine } from '../features/dashboardSlice'
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
