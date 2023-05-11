import React from 'react'
import myAxios from '../../app/api/axiosInstance'
import { useSelector } from 'react-redux'
import { selectToken } from '../../features/authSlice'
import { useAppDispatch } from '../../app/store'
import { getKitCartDataRows } from '../../features/kitCartMaintanceSlice'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

interface DeleteButtonProps {
  itemsForDelete: any[] | undefined
}

const DeleteButton = (props: DeleteButtonProps): JSX.Element => {
  const { itemsForDelete } = props
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const handleClick = (): void => {
    if (itemsForDelete) {
      Promise.all(
        itemsForDelete.map(async (item) => {
          return await myAxios.post(
            'Administration/KitCart/DeleteKitCartRecord',
            JSON.stringify(item)
          )
        }))
        .then((values) => {
          enqueueSnackbar(t('deleteSuccess', { count: values.length }), { variant: 'success' })
          dispatch(getKitCartDataRows())
            .catch(() => { console.log('hiba') })
        })
        .catch(() => {
          enqueueSnackbar(t('deleteError'), { variant: 'error' })
        })
    }
  }
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={handleClick}
      startIcon={<DeleteIcon />}
    >
      {t('deleteButtonText')}
    </Button>
  )
}

export default DeleteButton
