import React, { useEffect, useState } from 'react'
import { type ProductionLine } from '../../models/api/ProductionLine'
import { createStyles, makeStyles, type Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { MenuItem } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 180
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
)

const CreateMenuItems = (productionLines: ProductionLine[]): JSX.Element[] => {
  return productionLines.map((productionLine, i) => {
    return <MenuItem key={i} value={productionLine.productionLineCode}>{productionLine.productionLineCode}</MenuItem>
  })
}

interface DropDownProps {
  items: string[]
  onSelectedItem: (selectedItem: string) => void
  defaultValue?: string
}

const MyDropDown: React.FC<DropDownProps> = (props: DropDownProps): JSX.Element => {
  const {
    items,
    onSelectedItem,
    defaultValue
  } = props

  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    onSelectedItem((event.target.value as string))
  }

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">ProductionLines</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {items !== null && typeof items !== 'undefined'
          ? items.map((item, i) => {
            return <MenuItem value={item} key={i}>{item}</MenuItem>
          })
          : ''
        }
      </Select>
    </FormControl>
  )
}

export default MyDropDown
