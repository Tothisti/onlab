import React from 'react'
import TableData from './TableData'
import { type FieldData, type Column, type Row } from './DashboardDataMatrix'

interface IRow { fields: Record<string, string | FieldData | FieldData[]> }

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

interface DataMatrixBodyProps {
  rows: Row[]
  columns: Column[]
}

const DataMatrixBody = (props: DataMatrixBodyProps): JSX.Element => {
  const {
    rows,
    columns
  } = props

  return (
    <tbody>
      {MapDataToRows(rows, columns)}
    </tbody>
  )
}

export default DataMatrixBody
