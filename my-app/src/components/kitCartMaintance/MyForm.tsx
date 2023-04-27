import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import { Button, InputLabel, FormControl, Select, TextField, createStyles, makeStyles } from '@material-ui/core'
import AutoCompleteTextField from './AutoCompleteTextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    formControl: {
      margin: '12px',
      minWidth: 120
    },
    selectEmpty: {
      marginTop: 3
    }
  })
)

export interface TextInputType {
  type: 'text'
  defaultValue?: string | null
  maxLength?: number
}

export interface BooleanInputType {
  type: 'boolean'
  defaultValue?: boolean
}

export interface NumberInputType {
  type: 'number'
  defaultValue?: number
}

export interface SelectInputType {
  type: 'select'
  defaultValue?: string | null
  items: string[] | number[] | null | undefined
}
export interface AutoCompleteInputType {
  type: 'autocomplete'
  defaultValue?: string | null
  values: string[] | null
}

export interface InputField {
  inputType:
  TextInputType |
  NumberInputType |
  SelectInputType |
  AutoCompleteInputType |
  BooleanInputType
  name: string
  labelText: string
  required?: boolean
  readonly?: boolean
  validation?: (values: any) => { error: boolean, errorMessage?: string }
}

interface MyFormProps {
  fields: InputField[]
  onSubmitHandler: (values: any) => void
}

type MyFormValues = Record<string, any>

const MakeObjectFromArray = (arr: InputField[]): MyFormValues => {
  const obj = arr.reduce((acc, curr) => {
    return ({
      ...acc,
      [curr.name]:
        typeof curr.inputType.defaultValue !== 'undefined' &&
          curr.inputType.defaultValue !== null
          ? curr.inputType.defaultValue
          : ''
    })
  }, {})
  return obj
}

const validateAllFields = (fields: InputField[]) => (values: any): any => {
  const errObj = fields.reduce((acc, curr) => {
    if (typeof curr.validation === 'undefined') return acc
    const validationResult = curr.validation(values)
    if (validationResult.error) {
      return {
        ...acc,
        [curr.name]: curr.validation(values).errorMessage
      }
    } else return acc
  }, {})
  return errObj
}

const MyForm: React.FC<MyFormProps> = (props: MyFormProps) => {
  const { fields, onSubmitHandler } = props
  const classes = useStyles()
  const initialValues = useMemo(() => MakeObjectFromArray(fields), [])
  const formik = useFormik({
    initialValues,
    validate: validateAllFields(fields),
    onSubmit: onSubmitHandler
  })
  const renderInputFields = fields.map((field, i) => {
    const type = field.inputType.type
    switch (type) {
      case 'text':
        return (
          <FormControl className={classes.formControl} variant='outlined'>
            <TextField
              id={field.name}
              name={field.name}
              label={field.labelText}
              inputProps={{
                readOnly: field.readonly
              }}
              onChange={formik.handleChange}
              value={formik.values[field.name]}
              required={field.required}
              error={typeof formik.errors[field.name] !== 'undefined'}
              variant="outlined"
              helperText={typeof formik.errors[field.name] !== 'undefined' ? formik.errors[field.name] as string : ''}
              key={i}
            />
          </FormControl>
        )
      case 'number':
        return (
          <FormControl className={classes.formControl} variant='outlined'>
            <TextField
              id={field.name}
              type="number"
              name={field.name}
              label={field.labelText}
              inputProps={{
                readOnly: field.readonly
              }}
              onChange={formik.handleChange}
              value={formik.values[field.name]}
              required={field.required}
              error={typeof formik.errors[field.name] !== 'undefined'}
              variant="outlined"
              helperText={typeof formik.errors[field.name] !== 'undefined' ? formik.errors[field.name] as string : ''}
              key={i}
            />
          </FormControl>
        )
      case 'select':
        return (
          <FormControl
            required={field.required}
            error={typeof formik.errors[field.name] !== 'undefined'}
            className={classes.formControl}
            variant='filled'
          >
            <InputLabel htmlFor="filled-age-native-simple">{field.labelText}</InputLabel>
            <Select
              native
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              inputProps={{
                name: field.name,
                id: 'filled-age-native-simple'
              }}
            >
              <option aria-label="None" value="" ></option>
              {field.inputType.items?.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
              })}
            </Select >
            <FormHelperText>{typeof formik.errors[field.name] !== 'undefined' ? formik.errors[field.name] as string : ''}</FormHelperText>
          </FormControl>
        )
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                name={field.name}
                checked={formik.values[field.name]}
                onChange={formik.handleChange}
              />
            }
            label={field.labelText}
          />
        )
      case 'autocomplete':
        return (
          <AutoCompleteTextField
            name={field.name}
            label={field.labelText}
            values={field.inputType.values}
            defaultValue={field.inputType.defaultValue}
            handleInputChange={formik.setFieldValue}
          />)
      default:
        return null
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      {renderInputFields}
      <Button type='submit' variant='contained'>save</Button>
    </form>
  )
}

export default MyForm
