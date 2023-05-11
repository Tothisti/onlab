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
    gap: '6px',
    textAlign: 'center'
  },
  OUT: {
    background: 'red'
  },
  NS: {
    background: 'yellow'
  },
  NA: {
    background: 'gray'
  },
  IP: {
    background: 'green'
  },
  IT: {
    background: 'blue'
  },
  RFTR: {
    background: 'pink'
  }
})

interface Props {
  field: FieldData | FieldData[] | string
}
type stateClassNames = 'OUT' | 'NS' | 'NA' | 'IT' | 'IP' | 'RFTR'
const returnStateClassName = (state: string): stateClassNames => {
  if (state.includes('OUT')) return 'OUT'
  if (state.includes('NS')) return 'NS'
  if (state.includes('I/P')) return 'IP'
  if (state.includes('I/T')) return 'IT'
  if (state.includes('RFTR')) return 'RFTR'
  return 'NA'
}

const TableData = ({ field }: Props): JSX.Element => {
  const classes = useStyles()

  const createtableDataWithColor = (data: FieldData | string): JSX.Element => {
    if (typeof data === 'object') {
      return (
        <div
          className={`${classes.dataDiv} ${classes[returnStateClassName(data.value)]}`}
        >
          {data.value}
        </div>
      )
    } else {
      return (<div className={classes.dataDiv}>{data}</div>)
    }
  }
  return (
    <td className={classes.tableData}>
      <div className={classes.dataDiv}>
        {
          Array.isArray(field)
            ? field.map((item: FieldData, i) =>
              createtableDataWithColor(item))
            : createtableDataWithColor(field)
        }
      </div>
    </td>
  )
}

export default TableData
