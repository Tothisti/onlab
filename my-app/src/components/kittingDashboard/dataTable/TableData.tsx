import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  tableData: {
    height: '250px',
    borderBottom: '3px solid black'
  },
  dataDiv: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  }
})

interface Props {
  field: string | string[]
}

const TableData = ({ field }: Props): JSX.Element => {
  const classes = useStyles()

  return (
    <td className={classes.tableData}>
          <div className={classes.dataDiv}>
            {
              Array.isArray(field)
                ? field.map((item: string, i) =>
                    <div key={i}>{ item }</div>)
                : <div> {field} </div>
            }
          </div>
      </td>
  )
}

export default TableData
