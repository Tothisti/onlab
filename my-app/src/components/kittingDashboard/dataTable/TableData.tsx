import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { type FieldData } from './DashboardDataMatrix'

const useStyles = makeStyles({
  tableData: {
    height: '250px',
    borderBottom: '3px solid black'
  },
  dataDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'strectch',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: '6px'
  },
  dataItems: {
    flex: 1,
    textAlign: 'center',
    background: 'gray'
  }
})

interface Props {
  field: FieldData | FieldData[] | string
}

const TableData = ({ field }: Props): JSX.Element => {
  const classes = useStyles()
  console.log(field)
  return (
    <td className={classes.tableData}>
      <div className={classes.dataDiv}>
        {
          Array.isArray(field)
            ? field.map((item: FieldData, i) =>
              <div className={classes.dataItems} key={i}>{item.value}</div>)
            : <div> {typeof field === 'string' ? field : field.value} </div>
        }
      </div>
    </td>
  )
}

export default TableData
