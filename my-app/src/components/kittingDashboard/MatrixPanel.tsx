import React, { useEffect } from 'react'
import { type DashboardData } from '../../models/api/DashboardData'
import DasboardDataMatrix, { type Column, type Row } from './dataTable/DashboardDataMatrix'
import { useSelector } from 'react-redux'
import { GetDashboardData, selectDashboardData, selectPrepArea, selectProdLine, selectStatus } from '../../features/dashboardSlice'
import { CircularProgress } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../app/store'

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
  const matrixData = useSelector(selectDashboardData)
  const matrixDataLoadingState = useSelector(selectStatus)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const MapApiDataToCols = (data: DashboardData[] | null): Column[] => {
    if (data === null || data.length === 0) return []
    const res: Column[] = data[0].workCenters?.map((wc) => {
      return ({ field: wc.workCenter, position: wc.position })
    })
    return [{ field: t('order'), position: -99 }, ...res]
  }
  let matrix = <CircularProgress />
  useEffect(() => {
    dispatch(GetDashboardData())
      .then()
      .catch(() => { console.log('hiba') })
  }, [selectedProdLine, selectedPrepArea])
  if (matrixDataLoadingState === 'succeeded' && matrixData !== null) {
    const rows = MapApiDataToRows(matrixData)
    const cols = MapApiDataToCols(matrixData)
    matrix = <DasboardDataMatrix rows={rows} columns={cols} />
  }
  if (matrixDataLoadingState === 'failed') matrix = <div>{t('apiError')}</div>
  if (matrixData?.length === 0) matrix = <div>{t('nodata')}</div>
  return matrix
}

export default MatrixPanel
