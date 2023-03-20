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

const MapApiDataToCols = (data: DashboardData[] | null): Column[] => {
  if (data === null || data.length === 0) return []
  const res: Column[] = data[0].workCenters?.map((wc) => {
    return ({ field: wc.workCenter, position: wc.position })
  })
  return [{ field: 'order', position: -99 }, ...res]
}

const MapApiDataToRows = (data: DashboardData[] | null): Row[] => {
  if (data === null || data.length === 0) return []
  const res: Row[] = data.map((item) => {
    const fields = item.workCenters.map((order) => {
      return ({
        [order.workCenter]: order.kitCarts.map((kitCart) => {
          return { value: kitCart.description, status: kitCart.status }
        })
      })
    })
    const f = fields.reduce((result, current) => Object.assign(result, current), {})
    return ({
      position: item.orderPosition,
      fields: {
        order: item.vin ?? 'nincs vin',
        ...f
      }
    })
  })
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
    const rows = MapApiDataToRows(data)
    const cols = MapApiDataToCols(data)
    matrix = <DasboardDataMatrix rows={rows} columns={cols} />
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
