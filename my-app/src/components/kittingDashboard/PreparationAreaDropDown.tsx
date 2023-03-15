import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GenerateHeaders from '../../app/api/GenerateApiHeaders'
import myAxios from '../../app/axiosInstance'
import { selectToken } from '../../features/auth/authSlice'
import { type PreparationAreas } from '../../models/api/PreparationArea'
import { createStyles, makeStyles, type Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useAppDispatch } from '../../app/store'
import { selectPreparationArea } from '../../features/auth/dashboardSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
)

const CreateMenuItems = (preparationAreas: PreparationAreas[]): JSX.Element[] => {
  return preparationAreas.map((preparationArea, i) => {
    return <MenuItem key={i} value={preparationArea.areaCode}>{preparationArea.areaCode}</MenuItem>
  })
}

const PreparationAreaDropDown: React.FC = (): JSX.Element => {
  const classes = useStyles()
  const token = useSelector(selectToken)
  const [preparationAreas, setPreparationAreas] = useState<PreparationAreas[]>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    myAxios.post<PreparationAreas[]>(
      'Administration/PreparationArea/GetPreparationAreas',
      {},
      { headers: GenerateHeaders({ token }) }
    )
      .then((response) => { setPreparationAreas(response.data) })
      .catch(() => { console.log('hiba') })
  }, [])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    dispatch(selectPreparationArea((event.target.value as string)))
  }

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">PreparationAreas</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        defaultValue=''
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {preparationAreas != null
          ? CreateMenuItems(preparationAreas)
          : <MenuItem>NODATA</MenuItem>
        }
      </Select>
    </FormControl>
  )
}

export default PreparationAreaDropDown
