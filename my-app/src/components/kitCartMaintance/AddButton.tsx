import React, { useState } from 'react'
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
import Button from '@material-ui/core/Button'
import AddBoxIcon from '@material-ui/icons/AddBox'

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
  const { t } = useTranslation()
  const handleSubmit = (values: any): void => {
    // convert form values to API values
    if (values.preparationAreaCode === '') values.preparationAreaCode = null
    if (values.agvStationCode === '') values.agvStationCode = null
    if (values.rackSize === '') values.rackSize = null
    if (values.kitCartDescription === '') values.kitCartDescription = null

    if (values.kitCartType === '') values.kitCartType = null
    else values.kitCartType = parseInt(values.kitCartType)

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
        if (res.status === 200) enqueueSnackbar(t('success'), { variant: 'success' })
        // setIsOpen(false)
        dispatch(getKitCartDataRows())
          .then()
          .catch(() => { enqueueSnackbar(t('serverError'), { variant: 'error' }) })
      })
      .catch((e) => { enqueueSnackbar(t('apiError'), { variant: 'error' }) })
  }
  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={() => { setIsOpen(true) }}
        startIcon={<AddBoxIcon />}
      >
        {t('addButtonText')}
      </Button>
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
