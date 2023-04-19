import React from 'react'
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TableCol from './TableCol'
import TableData from './TableData'

const useStyles = makeStyles(() =>
  createStyles({
    tableContainer: {
      height: '800px',
      width: '100%',
      overflow: 'auto',
      backgroundColor: '#fff'
    },
    table: {
      borderCollapse: 'collapse'
    }
  })
)

interface Compare {
  position?: number | null
}

export interface Column extends Compare {
  field: string
  style?: React.CSSProperties
}

export interface FieldData {
  status: number
  value: string
}

interface IRow { fields: Record<string, string | FieldData | FieldData[]> }

export interface Row extends Compare, IRow {}

interface Props {
  columns: Column[]
  rows: Row[]
}

const CreateRow = (row: IRow, cols: Column[], key: number): JSX.Element => {
  const rowKeys = Object.keys(row.fields)
  const rowResult = cols.map((col, i) => {
    const rIndex = rowKeys.indexOf(col.field)
    return rIndex !== -1
      ? <TableData field={row.fields[col.field]} key={i} />
      : <TableData field='empty' key={i} />
  })
  return <tr key={key}>{rowResult}</tr>
}

const MapDataToRows = (rows: Row[], columns: Column[]): JSX.Element[] => {
  return rows.map((row: Row, key) => CreateRow(row, columns, key))
}

const MapDataToCols = (cols: Column[]): JSX.Element => {
  return (
    <tr style={{ height: '70px' }}>
      {cols.map((col, i) => {
        return (
          <TableCol key={i} field={col.field} />
        )
      })}
    </tr>
  )
}

const PositionCompareFn = <T extends Compare>(a: T, b: T): number => {
  if (typeof a.position === 'undefined' &&
      typeof b.position !== 'undefined') return 1
  if (typeof a.position !== 'undefined' &&
      typeof b.position === 'undefined') return -1
  if (typeof a.position !== 'undefined' &&
      typeof b.position !== 'undefined') {
    if ((a.position != null && b.position != null) && a.position > b.position) return 1
    if ((a.position != null && b.position != null) && a.position < b.position) return -1
    if (a.position === b.position) return 0
  }
  return 0
}

const OrderItemsByPosition = <T extends Compare>(list: T[]): T[] => {
  const temp = list.slice()
  return temp.sort(PositionCompareFn)
}

const DasboardDataMatrix: React.FC<Props> = (props: Props) => {
  let { columns, rows } = props
  columns = OrderItemsByPosition(columns)
  rows = OrderItemsByPosition(rows)
  const classes = useStyles()
  return (
    <Box className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          {MapDataToCols(columns)}
        </thead>
        <tbody>
          {MapDataToRows(rows, columns)}
        </tbody>
      </table>
    </Box>
  )
}

export default DasboardDataMatrix
