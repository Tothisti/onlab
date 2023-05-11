import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import useAxios from '../../hooks/useAxios'
import { type ProductionLine } from '../../models/api/ProductionLine'
import MyDropDown from '../../components/kittingDashboard/MyDropDown'
import { type PreparationAreas } from '../../models/api/PreparationArea'
import { useAppDispatch } from '../../app/store'
import { selectPrepArea, selectProdLine, selectPreparationArea, selectProductionLine } from '../../features/dashboardSlice'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const SearchingPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const { i18n, t } = useTranslation()
  const selectedProdLine = useSelector(selectProdLine)
  const selectedPrepArea = useSelector(selectPrepArea)
  const [prodLineData, prodLineLoadingState] = useAxios<ProductionLine[]>({
    resourcePath: 'AssemblyManufacturing/Kitting/KittingDashboard/GetProductionLines',
    HTTPMethod: 'GET'
  })

  let prodLineDropDown
  if (prodLineLoadingState === 'loading') prodLineDropDown = <CircularProgress />
  if (prodLineLoadingState === 'succeeded' && prodLineData !== null) {
    prodLineDropDown = (
      <MyDropDown
        label={t('prodLine')}
        items={prodLineData.map((item) => item.productionLineCode)}
        onSelectedItem={(selectedItem) => { dispatch(selectProductionLine(selectedItem)) }}
        defaultValue={selectedProdLine}
      />)
  }

  const [prepAreaData, prepAreaLoadingState] = useAxios<PreparationAreas[]>({
    resourcePath: 'Administration/PreparationArea/GetPreparationAreas',
    HTTPMethod: 'POST',
    headers: {
      language: i18n.language
    }
  })
  let prepAreaDropDown
  if (prepAreaLoadingState === 'loading') prepAreaDropDown = <CircularProgress />
  if (prepAreaLoadingState === 'succeeded' && prepAreaData !== null) {
    prepAreaDropDown = (
      <MyDropDown
        label={t('preparationArea')}
        items={prepAreaData.map((item) => item.areaCode)}
        onSelectedItem={(selectedItem) => { dispatch(selectPreparationArea(selectedItem)) }}
        defaultValue={selectedPrepArea}
      />)
  }
  return (
    <div>
      {prodLineDropDown}
      {prepAreaDropDown}
    </div>
  )
}

export default SearchingPanel
