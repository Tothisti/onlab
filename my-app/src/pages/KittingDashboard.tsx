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
import { type Row, type Column } from '../components/kittingDashboard/DashboardDataMatrix'
import { type DashboardData } from '../models/api/DashboardData'

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
  { field: '6969', position: -1 },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' }
]
const rows: Row[] = [
  {
    fields: {
      order: ['FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE'],
      1753: ['LATE', 'another', 'another2', 'another2', 'another2'],
      2732: ['mukodik']
    }
  },
  {
    fields: {
      order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
      2732: ['LATE']
    }
  },
  {
    fields: {
      order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
      2733: ['LATE']
    }
  },
  {
    position: 0,
    fields: {
      order: 'jeee',
      2734: ['LATE']
    }
  }
]

const MapApiDataToCols = (data: DashboardData[] | null): Column[] => {
  if (data === null) return []
  const res: Column[] = data[0].workCenters?.map((wc) => {
    return ({ field: wc.workCenter, position: wc.position })
  })
  return [{ field: 'order', position: -99 }, ...res]
}

const MapApiDataToRows = (data: DashboardData[] | null): Row[] => {
  if (data === null) return []
  const res: Row[] = data.map((item) => {
    const fields = item.workCenters.map((order) => {
      return ({
        [order.workCenter]: order.kitCarts.map((kitCart) => kitCart.description)
      })
    })
    const f = fields.reduce((result, current) => Object.assign(result, current), {})
    return ({
      position: item.orderPosition,
      fields: {
        order: item.vin ?? 'ninics',
        ...f
      }
    })
  })
  console.log(res)
  return res
}

const KittingDashboard: React.FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.dashboard.dashboardData)
  const status = useSelector((state: RootState) => state.dashboard.status)
  useEffect(() => {
    dispatch(GetDashboardData()).catch(() => { console.log('hiba') })
  }, [])

  let matrix: JSX.Element = <CircularProgress />
  if (status === 'succeeded') {
    const rowss = MapApiDataToRows(data)
    const colss = MapApiDataToCols(data)
    matrix = <DasboardDataMatrix rows={rowss} columns={colss} />
  }
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
