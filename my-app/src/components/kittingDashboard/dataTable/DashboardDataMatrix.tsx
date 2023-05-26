import React from 'react'
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import DataMatrixHeader from './DataMatrixHeader'
import DataMatrixBody from './DataMatrixBody'

const useStyles = makeStyles((theme) =>
  createStyles({
    tableContainer: {
      height: '80vh',
      width: '100%',
      overflow: 'auto',
      backgroundColor: theme.palette.common.white
    },
    table: {
      borderCollapse: 'collapse'
    }
  })
)

export interface FieldData {
  status: number
  value: string
}

export interface Row {
  fields: Record<string, string | FieldData | FieldData[]>
  position?: number | null
}

export interface Column {
  field: string
  fieldText?: string
  style?: React.CSSProperties
  position?: number | null
}

const OrderItemsByPosition = <T extends Row | Column>(list: T[]): T[] => {
  const temp = list.slice()
  return _.sortBy(temp, ['position'])
}

interface DasboardDataMatrixProps {
  columns: Column[]
  rows: Row[]
}

const DasboardDataMatrix = (props: DasboardDataMatrixProps): JSX.Element => {
  let {
    columns,
    rows
  } = props
  const classes = useStyles()

  columns = OrderItemsByPosition(columns)
  rows = OrderItemsByPosition(rows)

  return (
    <Box className={classes.tableContainer}>
      <table className={classes.table}>
        {<DataMatrixHeader columns={columns} />}
        {<DataMatrixBody columns={columns} rows={rows} />}
      </table>
    </Box>
  )
}

export default DasboardDataMatrix
