import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { type FieldData } from './DashboardDataMatrix'

const useStyles = makeStyles((theme) =>
  createStyles({
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
      background: '#CF1124',
      color: theme.palette.neutral.n100
    },
    NS: {
      background: '#F7C948'
    },
    NA: {
      background: 'gray'
    },
    IP: {
      background: '#27AB83'
    },
    IT: {
      background: '#9446ED'
    },
    RFTR: {
      background: 'pink'
    }
  }))

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

  const createtableDataWithColor = (data: FieldData | string, id?: number): JSX.Element => {
    if (typeof data === 'object') {
      return (
        <div
          className={`${classes.dataDiv} ${classes[returnStateClassName(data.value)]}`}
          key={id}
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
              createtableDataWithColor(item, i))
            : createtableDataWithColor(field)
        }
      </div>
    </td>
  )
}

export default TableData
