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

interface Column {
  field: string
  style?: React.CSSProperties
}

type Row = Record<string, string | string[]>

interface Props {
  columns: Column[]
  rows: Row[]
}

const CreateRow = (row: Row, cols: Column[]): JSX.Element => {
  const rowKeys = Object.keys(row)
  const rowResult = cols.map((col, i) => {
    const rIndex = rowKeys.indexOf(col.field)
    return rIndex !== -1
      ? <TableData field={row[col.field]} key={i} />
      : <TableData field='empty' key={i} />
  })
  return <tr>{rowResult}</tr>
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

const DasboardDataMatrix: React.FC<Props> = (props: Props) => {
  const { columns, rows } = props
  const classes = useStyles()
  return (
    <Box className={classes.tableContainer}>
      <table className={classes.table}>
        {MapDataToCols(columns)}
        {rows.map((row: Row) => CreateRow(row, columns))}
      </table>
    </Box>
  )
}

export default DasboardDataMatrix
