import React from 'react'
import myAxios from '../../app/api/axiosInstance'
import { useSelector } from 'react-redux'
import { selectToken } from '../../features/authSlice'
import GenerateTokenHeader from '../../app/api/GenerateApiHeaders'
import { useAppDispatch } from '../../app/store'
import { getKitCartDataRows } from '../../features/kitCartMaintanceSlice'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
interface DeleteButtonProps {
  itemsForDelete: any[] | undefined
}
const DeleteButton: React.FC<DeleteButtonProps> = (props): JSX.Element => {
  const { itemsForDelete } = props
  const token = useSelector(selectToken)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const handleClick = (): void => {
    if (typeof itemsForDelete !== 'undefined' &&
      itemsForDelete.length !== 0) {
      Promise.all(
        itemsForDelete.map(async (item) => {
          return await myAxios.post(
            'Administration/KitCart/DeleteKitCartRecord',
            JSON.stringify(item),
            {
              headers: {
                ...GenerateTokenHeader(token),
                'Content-Type': 'application/json'
              }
            }
          )
        }))
        .then((values) => {
          enqueueSnackbar(t('deleteSuccess', { count: values.length }), { variant: 'success' })
          dispatch(getKitCartDataRows())
            .then(() => { console.log('siker') })
            .catch(() => { console.log('hiba') })
        })
        .catch(() => {
          enqueueSnackbar(t('deleteError'), { variant: 'error' })
        })
    }
  }
  return (<button onClick={handleClick}>delete</button>)
}

export default DeleteButton
