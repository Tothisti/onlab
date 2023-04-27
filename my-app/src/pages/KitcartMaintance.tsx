import React, { useState, useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { DataGrid, type DataGridInterfaces } from 'react-agcobpmes-core'
import { type KitCartRecord } from '../models/api/KitCartRecord'
import { useTranslation } from 'react-i18next'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import MyEditFrom from '../components/kitCartMaintance/MyEditForm'
import myAxios from '../app/api/axiosInstance'
import useAxios from '../hooks/useAxios'
import { useSelector } from 'react-redux'
import { selectToken } from '../features/authSlice'
import GenerateTokenHeader from '../app/api/GenerateApiHeaders'
import { useSnackbar } from 'notistack'
import DeleteButton from '../components/kitCartMaintance/DeleteButton'
import AddButton from '../components/kitCartMaintance/AddButton'
import { getKitCartDataRows, selectKitCartData } from '../features/kitCartMaintanceSlice'
import { useAppDispatch } from '../app/store'

const useStyles = makeStyles((theme) =>
  createStyles(
    {
      inlineCellEditingStyle: {
        fontSize: '10px'
      },
      clickableCarMaker_cell: {
        cursor: 'pointer',
        color: '#68EDCB !important',
        textDecoration: 'underline'
      },
      dataGridDiv: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }
    }
  )
)

const KittingMaintance: React.FC = () => {
  const { i18n } = useTranslation()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [isOpen, setIsOpen] = useState(false)
  const [columns] = useState<DataGridInterfaces.IDataGridColumn[]>([
    { name: 'kitCartNo', title: 'KitCartNo', filtering: true, width: 7, tooltip: true, draggable: false },
    { name: 'kitCartDescription', title: 'KitCartDescription', filtering: true, width: 8, tooltip: true, draggable: false },
    { name: 'kitCartType', title: 'KitCartType', filtering: true, width: 8, tooltip: true, draggable: false },
    { name: 'rackSize', title: 'RackSize', filtering: true, width: 8, tooltip: true, draggable: false },
    { name: 'linkedSupplyArea', title: 'LinkedSupplyArea', filtering: true, width: 8, tooltip: true, draggable: false },
    { name: 'unloadPoint', title: 'UnloadPoint', filtering: true, width: 8, tooltip: true, draggable: false },
    { name: 'agvStationCode', title: 'AgvStationCode', filtering: true, width: 8, tooltip: true, draggable: false },
    { name: 'preparationAreaCode', title: 'PreparationAreaCode', filtering: true, width: 8, tooltip: true, draggable: false },
    { name: 'active', title: 'Active', filtering: true, width: 8, tooltip: true, draggable: false },
    { name: 'printPickingList', title: 'PrintPickingList', filtering: true, width: 8, tooltip: true, draggable: false },
    { name: 'kittingOffset', title: 'KittingOffset', filtering: true, width: 8, tooltip: true, draggable: false }
    /* { name: 'kitCartDescription', title: 'Make (Car manufacturer)', type: 'clickable', align: 'center', wrap: true, inlineEditing: true, inlineEditingParams: { type: 'select', selection: [], clearOnSave: true } },
    { name: 'kitCartType', title: 'Model', wrap: false, tooltip: true, copyable: true, width: '80px', autoWidth: true, realColumnIndex: 4 },
    { name: 'rackSize', title: 'Year', sorting: false, inlineEditing: true, inlineEditingParams: { type: 'dateTime' } },
    { name: 'like', title: 'Like', inlineEditing: true, inlineEditingParams: { type: 'checkbox' }, width: 5 },
    { name: 'horsepower', title: 'HP', grouping: false, width: 5 } */
  ])
  const dispatch = useAppDispatch()
  const [selectedRow, setSelectedRow] = useState<any>()
  const rows = useSelector(selectKitCartData)
  const token = useSelector(selectToken)

  const handleSubmit = (values: any): void => {
    // convert form values to API values
    if (values.preparationAreaCode === '') values.preparationAreaCode = null
    if (values.agvStationCode === '') values.agvStationCode = null
    if (values.rackSize === '') values.rackSize = null
    if (values.kitCartDescription === '') values.kitCartDescription = null

    if (values.kitCartType === '') values.kitCartType = null
    else values.kitCartType = parseInt(values.kitCartType)

    console.log(values)
    // api post call
    myAxios.post(
      'Administration/KitCart/UpdateKitCartRecord',
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

  const [selectedRowsForDelete, setSelectedRowsForDelete] = useState<any[]>()
  const handleSelection = (arrayOfSelection: any): any => {
    setSelectedRowsForDelete(arrayOfSelection)
  }

  const showDataOfRowOfClickedCell = useCallback((rowOfCell: any) => {
    alert(JSON.stringify(rowOfCell, null, 4))
  }, [])

  const setClickableCellStyle = useCallback((row: any) => {
    return classes.clickableCarMaker_cell
  }, [classes.clickableCarMaker_cell])

  const handleClickOnEditIcon = (row: any): void => {
    setIsOpen(true)
    setSelectedRow(row)
  }

  const [options] = useState<DataGridInterfaces.IDataGridOptions>({
    cell: {
      clickable: {
        callback: showDataOfRowOfClickedCell,
        style: setClickableCellStyle
      },
      variant: 'h4'
    },
    row: {
      highlighted: {
        condition: (car: any) => true
      }
    },
    sorting: true,
    filtering: true,
    searching: true,
    selection: {
      multiple: true,
      callback: handleSelection
    },
    resizable: true,
    maxHeight: '80vh',
    idColumn: 'kitCartNo',
    paging: {
      color: '#FF0000',
      defaultPageSize: 10
    },
    language: 'fi-FI',
    editColumn: {
      width: 7,
      components: [(row: any) => {
        return (
          <IconButton onClick={() => { handleClickOnEditIcon(row) }}>
            <EditIcon />
          </IconButton>
        )
      }]
    },
    onSave: (workBook: any) => {
      console.log(workBook)
    }
  })

  useEffect(() => {
    dispatch(getKitCartDataRows())
      .then(() => { console.log('siker') })
      .catch(() => { console.log('hiba') })
  }, [])

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <AddButton />
        <DeleteButton
          itemsForDelete={selectedRowsForDelete}
        />
        <div>{selectedRowsForDelete?.length} selected</div>
      </Grid>
      <div className={classes.dataGridDiv}>
        <DataGrid
          rows={rows ?? []}
          columns={columns}
          options={options}
        />
      </div>
      <MyEditFrom
        editableData={selectedRow}
        isOpen={isOpen}
        onRequestClose={() => { setIsOpen(false) }}
        onSubmit={handleSubmit}
      />
    </Grid>
  )
}

export default KittingMaintance
