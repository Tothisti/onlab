import React from 'react'
import TableCol from './TableCol'
import { type Column } from './DashboardDataMatrix'

const MapDataToCols = (cols: Column[]): JSX.Element => {
  return (
    <tr style={{ height: '70px' }}>
      {cols.map((col, i) => {
        return (
          <TableCol key={i} field={col.fieldText ?? col.field} />
        )
      })}
    </tr>
  )
}

interface DataMatrixHeaderProps {
  columns: Column[]
}
const DataMatrixHeader = (props: DataMatrixHeaderProps): JSX.Element => {
  const { columns } = props
  return (
    <thead>
      {MapDataToCols(columns)}
    </thead>
  )
}

export default DataMatrixHeader
