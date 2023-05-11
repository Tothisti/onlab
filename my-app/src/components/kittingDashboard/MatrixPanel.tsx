import React, { useEffect } from 'react'
import { type DashboardData } from '../../models/api/DashboardData'
import DasboardDataMatrix, { type Column, type Row } from './dataTable/DashboardDataMatrix'
import { useSelector } from 'react-redux'
import { GetDashboardData, selectDashboardData, selectPrepArea, selectProdLine, selectStatus } from '../../features/dashboardSlice'
import { CircularProgress } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../app/store'

const MapDashboardDataToRows = (dashboardData: DashboardData[] | null): Row[] => {
  if (!dashboardData) return []
  const res: Row[] = dashboardData.map((data) => {
    const fields = data.workCenters.map((order) => {
      return ({
        [order.workCenter]: order.kitCarts.map((kitCart) => {
          return { value: kitCart.description, status: kitCart.status }
        })
      })
    })
    const fieldsObject = fields.reduce((result, current) => Object.assign(result, current), {})
    return ({
      position: data.orderPosition,
      fields: {
        order: data.vin ?? 'no vin',
        ...fieldsObject
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

  useEffect(() => {
    dispatch(GetDashboardData())
      .catch(() => { console.log('hiba') })
  }, [selectedProdLine, selectedPrepArea])

  const MapDashboardDataToCols = (data: DashboardData[] | null): Column[] => {
    if (data === null || data.length === 0) return []
    const res: Column[] = data[0].workCenters?.map((wc) => {
      return ({ field: wc.workCenter, position: wc.position })
    })
    const orderText = t('order')
    return [{ field: 'order', position: -999, fieldText: orderText }, ...res]
  }

  const GetMatrixComponent = (): JSX.Element => {
    if (matrixDataLoadingState === 'succeeded' && matrixData !== null) {
      const rows = MapDashboardDataToRows(matrixData)
      const cols = MapDashboardDataToCols(matrixData)
      return <DasboardDataMatrix rows={rows} columns={cols} />
    }
    if (matrixDataLoadingState === 'loading') {
      return <CircularProgress />
    }
    if (matrixDataLoadingState === 'failed') return <div>{t('apiError')}</div>
    return <div>{t('nodata')}</div>
  }

  return GetMatrixComponent()
}

export default MatrixPanel
