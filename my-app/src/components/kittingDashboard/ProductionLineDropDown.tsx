import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GenerateHeaders from '../../app/api/GenerateApiHeaders'
import myAxios from '../../app/axiosInstance'
import { selectToken } from '../../features/auth/authSlice'
import { type ProductionLine } from '../../models/api/ProductionLine'
import { createStyles, makeStyles, type Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { type RootState, useAppDispatch } from '../../app/store'
import { selectProductionLine } from '../../features/auth/dashboardSlice'

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

const ProductionLineDropDown: React.FC = (): JSX.Element => {
  const classes = useStyles()
  const token = useSelector(selectToken)
  const [productionLines, setProductionLines] = useState<ProductionLine[]>()
  const dispatch = useAppDispatch()
  const prodLine = useSelector((state: RootState) => state.dashboard.productionLine)

  useEffect(() => {
    myAxios.get<ProductionLine[]>(
      'AssemblyManufacturing/Kitting/KittingDashboard/GetProductionLines',
      { headers: GenerateHeaders({ token }) }
    )
      .then((response) => { setProductionLines(response.data) })
      .catch(() => { console.log('hiba') })
  }, [])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    dispatch(selectProductionLine((event.target.value as string)))
  }

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">ProductionLines</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        defaultValue={prodLine !== null ? prodLine : ''}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {productionLines != null
          ? CreateMenuItems(productionLines)
          : <MenuItem>NODATA</MenuItem>
        }
      </Select>
    </FormControl>
  )
}

export default ProductionLineDropDown
