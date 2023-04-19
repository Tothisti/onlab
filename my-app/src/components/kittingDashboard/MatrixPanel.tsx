import React from 'react'
import { type DashboardData } from '../../models/api/DashboardData'
import DasboardDataMatrix, { type Column, type Row } from './dataTable/DashboardDataMatrix'
import { useSelector } from 'react-redux'
import { selectPrepArea, selectProdLine } from '../../features/dashboardSlice'
import useAxios from '../../hooks/useAxios'
import { CircularProgress } from '@material-ui/core'

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
        order: item.vin ?? 'no vin',
        ...f
      }
    })
  })
  return res
}

const MatrixPanel: React.FC = () => {
  const selectedProdLine = useSelector(selectProdLine)
  const selectedPrepArea = useSelector(selectPrepArea)

  const prodLine = selectedProdLine ?? ''
  const query = selectedPrepArea !== null
    ? `?PreparationArea=${selectedPrepArea}`
    : ''
  const [matrixData, matrixDataLoadingState] = useAxios<DashboardData[]>({
    resourcePath: 'AssemblyManufacturing/Kitting/KittingDashboard/GetDashboardData/US10/' + prodLine + query,
    HTTPMethod: 'GET'
  })
  let matrix = <CircularProgress />

  if (matrixDataLoadingState === 'succeeded' && matrixData !== null) {
    const rows = MapApiDataToRows(matrixData)
    const cols = MapApiDataToCols(matrixData)
    matrix = <DasboardDataMatrix rows={rows} columns={cols} />
  }
  if (matrixDataLoadingState === 'failed') matrix = <div>Error</div>

  return matrix
}

export default MatrixPanel
