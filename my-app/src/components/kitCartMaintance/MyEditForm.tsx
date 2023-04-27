import React from 'react'
import { Dialog } from 'react-agcobpmes-core'
import { type KitCartRecord } from '../../models/api/KitCartRecord'
import MyForm, { type InputField } from './MyForm'
import useAxios from '../../hooks/useAxios'
import { type KitCartType } from '../../models/api/KitCartType'
import { useTranslation } from 'react-i18next'
import { type PreparationAreaCode } from '../../models/api/PreparationAreaCode'
import { type AvgStationCode } from '../../models/api/AvgStationCode'

interface MyEditFormProps {
  isOpen: boolean
  onRequestClose: React.Dispatch<React.SetStateAction<boolean>>
  editableData: KitCartRecord
  onSubmit: (values: any) => void
}
// ! KitCartNo. and PSA => not editable

const MyEditFrom = ({ isOpen, onRequestClose, editableData, onSubmit }: MyEditFormProps): JSX.Element => {
  const { i18n } = useTranslation()
  const [kitCartTypeList] = useAxios<KitCartType[]>({
    resourcePath: 'Administration/KitCart/GetKitCartTypeList',
    HTTPMethod: 'GET',
    headers: {
      language: i18n.language // lang !!!
    }
  })
  const [agvStationCodeList] = useAxios<AvgStationCode[]>({
    resourcePath: 'Administration/KitCart/GetAgvStationCodeList',
    HTTPMethod: 'GET',
    headers: {
      language: i18n.language // lang !!!
    }
  })
  const [preparationAreaCodeList] = useAxios<PreparationAreaCode[]>({
    resourcePath: 'Administration/KitCart/GetPreparationAreaCodeList',
    HTTPMethod: 'GET',
    headers: {
      language: i18n.language // lang !!!
    }
  })
  const [SupplyAreaList] = useAxios<string[]>({
    resourcePath: 'Administration/KitCart/GetSupplyAreaList/US10',
    HTTPMethod: 'GET',
    headers: {
      language: i18n.language // lang !!!
    }
  })
  let fields: InputField[] | undefined

  if (typeof editableData !== 'undefined') {
    fields = [
      {
        name: 'kitCartNo',
        labelText: i18n.t('kitCartNo'),
        readonly: true,
        inputType: { type: 'text', defaultValue: editableData.kitCartNo ?? '' },
        validation: (values: any) => {
          if (values.firstname === 'teszt') { return { error: true, errorMessage: 'fdsfsd' } }
          return { error: false }
        }
      },
      {
        name: 'kitCartDescription',
        labelText: i18n.t('kitCartDescription'),
        inputType: { type: 'text', defaultValue: editableData.kitCartDescription }
        // validation: (values: any) => {
        //   if (values.firstname === 'teszt') { return { error: true, errorMessage: 'fdsfsd' } }
        //   return { error: false }
        // }
      },
      {
        name: 'kitCartType',
        labelText: i18n.t('kitCartType'),
        inputType: {
          type: 'select',
          defaultValue: editableData.kitCartType.toString(),
          items: kitCartTypeList?.map(item => item.type)
        }
      },
      {
        name: 'rackSize',
        labelText: i18n.t('rackSize'),
        inputType: {
          type: 'number',
          defaultValue: editableData.rackSize
        }
      },
      {
        name: 'linkedSupplyArea',
        labelText: i18n.t('linkedSupplyArea'),
        inputType: {
          type: 'autocomplete',
          defaultValue: editableData.linkedSupplyArea,
          values: SupplyAreaList
        }
      },
      {
        name: 'unloadPoint',
        labelText: i18n.t('unloadPoint'),
        readonly: false,
        inputType: { type: 'text', defaultValue: editableData.unloadPoint ?? '' }
      },
      {
        name: 'agvStationCode',
        labelText: i18n.t('agvStationCode'),
        inputType: {
          type: 'select',
          defaultValue: editableData.agvStationCode,
          items: agvStationCodeList?.map(item => item.description) ?? []
        }
      },
      {
        name: 'preparationAreaCode',
        labelText: i18n.t('preparationAreaCode'),
        inputType: {
          type: 'select',
          defaultValue: editableData.preparationAreaCode,
          items: preparationAreaCodeList !== null ? preparationAreaCodeList.map(item => item.preparationAreaCode) : []
        }
      },
      {
        name: 'active',
        labelText: i18n.t('active'),
        inputType: {
          type: 'boolean',
          defaultValue: editableData.active
        }
      },
      {
        name: 'printPickingList',
        labelText: i18n.t('printPickingList'),
        inputType: {
          type: 'boolean',
          defaultValue: editableData.printPickingList
        }
      },
      {
        name: 'kittingOffset',
        labelText: i18n.t('kittingOffset'),
        inputType: {
          type: 'number',
          defaultValue: editableData.kittingOffset
        }
      }
    ]
  }
  const title = i18n.t('updateKitCartFormText')
  return (
    <Dialog title={title} open={isOpen} handleClose={() => { onRequestClose(false) }} maxWidth='md'>
      {typeof fields !== 'undefined' &&
        <MyForm
          fields={fields}
          onSubmitHandler={onSubmit}
        />}
    </Dialog>
  )
}

export default MyEditFrom
