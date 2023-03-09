import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  tableHeader: {
    minWidth: '200px',
    width: '100%',
    position: 'sticky',
    top: 0,
    background: '#fff'
  }
})

interface Props {
  field: string
  key: number
  style?: React.CSSProperties
}

const TableCol = ({ field, key, style }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <th
      className={classes.tableHeader}
      style={style}
      key={key}
    >
      {field}
    </th>
  )
}

export default TableCol
