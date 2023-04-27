import React, { useState, useCallback, useEffect } from 'react'
import { type KitCartRecord } from '../../models/api/KitCartRecord'
import { useTranslation } from 'react-i18next'
import myAxios from '../../app/api/axiosInstance'
import { useSelector } from 'react-redux'
import { selectToken } from '../../features/authSlice'
import GenerateTokenHeader from '../../app/api/GenerateApiHeaders'
import { useSnackbar } from 'notistack'
import { useAppDispatch } from '../../app/store'
import { getKitCartDataRows } from '../../features/kitCartMaintanceSlice'
import MyAddNewForm from './MyAddNewForm'

const AddButton: React.FC = (): JSX.Element => {
  const [selectedRow] = useState<KitCartRecord>({
    kitCartNo: null,
    kitCartDescription: null,
    kitCartType: 0,
    rackSize: 0,
    linkedSupplyArea: null,
    unloadPoint: '',
    agvStationCode: null,
    preparationAreaCode: null,
    active: true,
    printPickingList: true,
    kittingOffset: 0
  })
  const [isOpen, setIsOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const token = useSelector(selectToken)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const handleSubmit = (values: any): void => {
    console.log('before state')
    console.log(values)
    // convert form values to API values
    if (values.preparationAreaCode === '') values.preparationAreaCode = null
    if (values.agvStationCode === '') values.agvStationCode = null
    if (values.rackSize === '') values.rackSize = null
    if (values.kitCartDescription === '') values.kitCartDescription = null

    if (values.kitCartType === '') values.kitCartType = null
    else values.kitCartType = parseInt(values.kitCartType)

    console.log('after state')
    console.log(values)
    // api post call
    myAxios.post(
      'Administration/KitCart/CreateKitCartRecord',
      JSON.stringify(values),
      {
        headers: {
          ...GenerateTokenHeader(token),
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        if (res.status === 200) enqueueSnackbar(i18n.t('success'), { variant: 'success' })
        // setIsOpen(false)
        dispatch(getKitCartDataRows())
          .then(() => { console.log('siker') })
          .catch(() => { console.log('hiba') })
      })
      .catch((e) => { enqueueSnackbar(i18n.t('apiError'), { variant: 'error' }) })
  }
  return (
    <>
      <button onClick={() => { setIsOpen(true) }}>add</button>
      <MyAddNewForm
        editableData={selectedRow}
        isOpen={isOpen}
        onRequestClose={() => { setIsOpen(false) }}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default AddButton
