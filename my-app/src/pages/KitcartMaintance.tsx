import React, { type ReactElement, useState, useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { DataGrid, type DataGridInterfaces } from 'react-agcobpmes-core'
import { type KitCartRecord } from '../models/api/KitCartRecord'
import { useTranslation } from 'react-i18next'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import MyEditFrom from '../components/kitCartMaintance/EditForm'
import { useAppDispatch } from '../app/store'
import { setStateOfEditForm } from '../features/kitCartMaintanceSlice'
import useAxios from '../hooks/useAxios'

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
      }
    }
  )
)

const KittingMaintance: React.FC = () => {
  const { i18n } = useTranslation()
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [columns, setColumns] = useState<DataGridInterfaces.IDataGridColumn[]>([
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
  const [selectedRow, setSelectedRow] = useState<any>()
  const [rows, setRows] = useState<KitCartRecord[]>([])

  const showDataOfRowOfClickedCell = useCallback((rowOfCell: any) => {
    alert(JSON.stringify(rowOfCell, null, 4))
  }, [])

  const setClickableCellStyle = useCallback((row: any) => {
    return classes.clickableCarMaker_cell
  }, [classes.clickableCarMaker_cell])

  const [options, setOptions] = useState<DataGridInterfaces.IDataGridOptions>({
    cell: {
      clickable: {
        callback: showDataOfRowOfClickedCell,
        style: setClickableCellStyle
      },
      variant: 'h4'
    },
    row: {
      highlighted: {
        condition: (car) => true
      }
      // clickable: {
      //     callback: showPhotoOfClickedCar,
      //     condition: () => true,
      //     style: setClickableRowStyle,
      // },
    },
    sorting: true,
    filtering: true,
    searching: true,
    // grouping: {
    //     default: [{ columnName: 'make' }],
    //     dragDrop: true,
    //     panel: true,
    //     controls: true,
    // },
    selection: {
      multiple: true
    },
    resizable: true,
    maxHeight: '80vh',
    idColumn: 'kitCartNo',
    paging: {
      color: '#FF0000',
      defaultPageSize: 10
    },
    // remote: {
    //     parameters: remoteParameters,
    //     changeParameters: setRemoteParameters
    // },
    language: 'fi-FI',
    editColumn: {
      width: 7,
      components: [(row: any) => <IconButton onClick={() => { setIsOpen(true); console.log(row); setSelectedRow(row) }}><EditIcon /></IconButton>]
    },
    onSave: (workBook: any) => {
      console.log(workBook)
    }
  })

  const [result, loadingState] = useAxios<KitCartRecord[]>({
    resourcePath: 'Administration/KitCart/GetKitCartRecords',
    HTTPMethod: 'GET',
    headers: {
      language: i18n.language
    }
  })

  useEffect(() => {
    if (loadingState === 'succeeded' && result !== null) setRows(result)
  }, [loadingState])

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          options={options}
        />
      </div>
      <MyEditFrom
        isOpen={isOpen}
        onRequestClose={setIsOpen}
        EditableData={selectedRow}
      />
    </Grid>
  )
}

export default KittingMaintance
