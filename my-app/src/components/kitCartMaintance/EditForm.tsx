import React, { useState } from 'react'
import { EditForm, type DataGridInterfaces, type IEditFormInterfaces, Dialog, EditFormType } from 'react-agcobpmes-core'

interface MyEditFormProps {
  isOpen: boolean
  onRequestClose: React.Dispatch<React.SetStateAction<boolean>>
  EditableData: any
}

const MyEditFrom = ({ isOpen, onRequestClose, EditableData }: MyEditFormProps): JSX.Element => {
  console.log(EditableData)
  const nameFieldDetails: IEditFormInterfaces.ITextField = {
    type: 'text',
    maxLength: 15,
    minLength: 3
  }
  const ageFieldDetails: IEditFormInterfaces.INumberField = {
    type: 'number',
    maxValue: 100,
    minValue: 18,
    step: 0.01
  }
  const activeFieldDetails: IEditFormInterfaces.IBooleanField = {
    type: 'boolean'
  }
  const dateFieldDetails: IEditFormInterfaces.IDateField = {
    type: 'date',
    minValue: '2011-12-12'
  }
  const autocompleteFieldDetails: IEditFormInterfaces.IAutocompleteField = {
    type: 'autocomplete',
    options: [{ key: 'something', value: 'valami' }, { key: 'something2', value: 'valamii2' }]
  }

  const dateRangeField: IEditFormInterfaces.IDateRange = {
    type: 'dateRange'
  }

  const [fields] = useState<DataGridInterfaces.IDataGridColumn[]>([
    { name: 'name', title: 'name', formParams: { fieldDetails: nameFieldDetails, mandatory: false, createOnly: false } },
    { name: 'age', title: 'age', formParams: { fieldDetails: ageFieldDetails, mandatory: false } },
    { name: 'active', title: 'Active', formParams: { fieldDetails: activeFieldDetails, mandatory: false } },
    { name: 'date', title: 'Date', formParams: { fieldDetails: dateFieldDetails, mandatory: false } },
    { name: 'autocomplete', title: 'Autocomplete', formParams: { fieldDetails: autocompleteFieldDetails, mandatory: false } },
    { name: 'createOn', title: 'Create On', formParams: { fieldDetails: dateRangeField, mandatory: false } },
    { name: 'dateRange', title: 'Date Range', formParams: { fieldDetails: dateRangeField, mandatory: false } },
    { name: 'dateRange', title: 'Date Range', formParams: { fieldDetails: dateRangeField, mandatory: false } },
    { name: 'dateRange', title: 'Date Range', formParams: { fieldDetails: dateRangeField, mandatory: false } },
    { name: 'name', title: 'name', formParams: { fieldDetails: nameFieldDetails, mandatory: false, createOnly: false } },
    { name: 'name', title: 'name', formParams: { fieldDetails: nameFieldDetails, mandatory: false, createOnly: false, readOnly: true } },
    { name: 'age', title: 'age', formParams: { fieldDetails: ageFieldDetails, mandatory: false } },
    { name: 'active', title: 'Active', formParams: { fieldDetails: activeFieldDetails, mandatory: false } },
    { name: 'date', title: 'Date', formParams: { fieldDetails: dateFieldDetails, mandatory: false } },
    { name: 'autocomplete', title: 'Autocomplete', formParams: { fieldDetails: { ...autocompleteFieldDetails }, mandatory: false } },
    { name: 'autocomplete', title: 'Autocomplete', formParams: { fieldDetails: autocompleteFieldDetails, mandatory: false, readOnly: true } },
    { name: 'createOn', title: 'Create On', formParams: { fieldDetails: dateRangeField, mandatory: false } }
  ])
  // develop
  return (
    <Dialog title="Form" open={isOpen} handleClose={() => { onRequestClose(false) }} maxWidth='md'>
      <EditForm
        fields={fields}
        onSubmit={(formData) => { console.log('submit') }}
        onCancel={() => { onRequestClose(false) }}
        type={EditFormType.UPDATE}
        isClearable={true}
      />
    </Dialog>
  )
}

export default MyEditFrom
