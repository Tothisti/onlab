import React, { useState, useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { DataGrid, type DataGridInterfaces } from 'react-agcobpmes-core'
import { useTranslation } from 'react-i18next'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import MyEditFrom from '../components/kitCartMaintance/MyEditForm'
import myAxios from '../app/api/axiosInstance'
import { useSelector } from 'react-redux'
import { selectToken } from '../features/authSlice'
import GenerateTokenHeader from '../app/api/GenerateApiHeaders'
import { useSnackbar } from 'notistack'
import DeleteButton from '../components/kitCartMaintance/DeleteButton'
import AddButton from '../components/kitCartMaintance/AddButton'
import { getKitCartDataRows, selectKitCartData } from '../features/kitCartMaintanceSlice'
import { useAppDispatch } from '../app/store'
import { Box, Typography } from '@material-ui/core'
import { GetCorrectLanguageFormat } from '../app/i18/i18n'

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
  const { t } = useTranslation()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [isOpen, setIsOpen] = useState(false)
  const [columns] = useState<DataGridInterfaces.IDataGridColumn[]>([
    { name: 'kitCartNo', title: t('kitCartNo'), filtering: true, width: 7, tooltip: true },
    { name: 'kitCartDescription', title: t('kitCartDescription'), filtering: true, width: 8, tooltip: true },
    { name: 'kitCartType', title: t('kitCartType'), filtering: true, width: 8, tooltip: true },
    { name: 'rackSize', title: t('rackSize'), filtering: true, width: 8, tooltip: true },
    { name: 'linkedSupplyArea', title: t('linkedSupplyArea'), filtering: true, width: 8, tooltip: true },
    { name: 'unloadPoint', title: t('unloadPoint'), filtering: true, width: 8, tooltip: true },
    { name: 'agvStationCode', title: t('agvStationCode'), filtering: true, width: 8, tooltip: true },
    { name: 'preparationAreaCode', title: t('preparationAreaCode'), filtering: true, width: 8, tooltip: true },
    { name: 'active', title: t('active'), filtering: true, width: 8, tooltip: true },
    { name: 'printPickingList', title: t('printPickingList'), filtering: true, width: 8, tooltip: true },
    { name: 'kittingOffset', title: t('KittingOffset'), filtering: true, width: 8, tooltip: true }
  ])
  const dispatch = useAppDispatch()
  const [selectedRow, setSelectedRow] = useState<any>()
  const rows = useSelector(selectKitCartData)
  const { i18n } = useTranslation()
  const handleSubmit = (values: any): void => {
    // convert form values to API values
    if (values.preparationAreaCode === '') values.preparationAreaCode = null
    if (values.agvStationCode === '') values.agvStationCode = null
    if (values.rackSize === '') values.rackSize = null
    if (values.kitCartDescription === '') values.kitCartDescription = null

    if (values.kitCartType === '') values.kitCartType = null
    else values.kitCartType = parseInt(values.kitCartType)

    // api post call
    myAxios.post(
      'Administration/KitCart/UpdateKitCartRecord',
      JSON.stringify(values)
    )
      .then((res) => {
        if (res.status === 200) enqueueSnackbar(t('success'), { variant: 'success' })
        setIsOpen(false)
        dispatch(getKitCartDataRows())
          .then()
          .catch(() => { console.log('error') })
      })
      .catch((e) => { enqueueSnackbar(t('apiError'), { variant: 'error' }) })
  }

  const [selectedRowsForDelete, setSelectedRowsForDelete] = useState<any[]>([])
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
      color: '#BCCCDC',
      defaultPageSize: 10
    },
    language: GetCorrectLanguageFormat(i18n.language),
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
      .catch(() => { console.log('hiba') })
  }, [])

  const selectedRowLength = typeof selectedRowsForDelete === 'undefined' ? 0 : selectedRowsForDelete.length
  return (
    <Grid
      container={true}
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Grid item={true} style={{ width: '100%', padding: '0 12px 0 12px' }}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography>
            {`${selectedRowLength} ${t('selectedRowLabelText')}`}
          </Typography>
          <Box
            display='flex'
            style={{ gap: '10px' }}
          >
            <AddButton />
            <DeleteButton
              itemsForDelete={selectedRowsForDelete}
            />
          </Box>
        </Box>
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
