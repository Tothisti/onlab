import React, { useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import DasboardDataMatrix from '../components/kittingDashboard/DashboardDataMatrix'
import { type RootState, useAppDispatch } from '../app/store'
import ProductionLineDropDown from '../components/kittingDashboard/ProductionLineDropDown'
import PreparationAreaDropDown from '../components/kittingDashboard/PreparationAreaDropDown'
import { GetDashboardData } from '../features/auth/dashboardSlice'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Button } from '@material-ui/core'

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
// testdata
type Row = Record<string, string | string[]> & { position?: number }
const cols = [
  { field: 'order', style: { minWidth: '250px' } },
  { field: '1753' },
  { field: '2732' },
  { field: '2733' },
  { field: '2734' },
  { field: '2735' },
  { field: '2736' },
  { field: '2737' },
  { field: '2738' },
  { field: '2739' },
  { field: '2740' },
  { field: '2741' },
  { field: '2742' },
  { field: '2743' },
  { field: '2744' },
  { field: '2745' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' }
]
const rows: Row[] = [
  {
    order: ['FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE'],
    1753: ['LATE', 'another', 'another2', 'another2', 'another2'],
    2732: ['mukodik']
  },
  {
    order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
    2732: ['LATE']
  },
  {
    order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
    2733: ['LATE']
  },
  {
    order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
    2734: ['LATE']
  },
  {
    order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
    2735: ['LATE']
  }
]

const KittingDashboard: React.FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.dashboard.dashboardData)
  const status = useSelector((state: RootState) => state.dashboard.status)
  console.log(data)
  useEffect(() => {
    dispatch(GetDashboardData()).catch(() => { console.log('hiba') })
  }, [])

  let matrix: JSX.Element = <CircularProgress />
  if (status === 'succeeded') matrix = <DasboardDataMatrix rows={rows} columns={cols} />
  if (status === 'failed') matrix = <div>Error</div>

  return (
    <Box className={classes.layout}>
      <ProductionLineDropDown />
      <PreparationAreaDropDown />
      <Button variant='contained' color='primary' onClick={() => { dispatch(GetDashboardData()).catch(() => { console.log('hiba') }) }}>Search</Button>
      <div>
        {matrix}
      </div>
    </Box>
  )
}

export default KittingDashboard
