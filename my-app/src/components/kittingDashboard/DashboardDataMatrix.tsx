import React from 'react'
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TableCol from './dataTable/TableCol'
import TableData from './dataTable/TableData'

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
  position?: number
}

interface Column extends Compare {
  field: string
  style?: React.CSSProperties
}

type Row = Record<string, string | string[]> & Compare

interface Props {
  columns: Column[]
  rows: Row[]
}

const CreateRow = (row: Row, cols: Column[], key: number): JSX.Element => {
  const rowKeys = Object.keys(row)
  const rowResult = cols.map((col, i) => {
    const rIndex = rowKeys.indexOf(col.field)
    return rIndex !== -1
      ? <TableData field={row[col.field]} key={i} />
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
//! sorting test
// const PositionCompareFn = <T extends Compare>(a: T, b: T): number => {
//   return 0
// }

// const OrderItemsByPosition = <T extends Compare>(list: T[]): T[] => {
//   const listWithoutPosition = list.filter((item) => typeof item.position === 'undefined')
//   const
// }

const DasboardDataMatrix: React.FC<Props> = (props: Props) => {
  const { columns, rows } = props
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
