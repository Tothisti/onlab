import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import DasboardDataMatrix from '../components/kittingDashboard/DashboardDataMatrix'

const useStyles = makeStyles((_theme) =>
  createStyles(
    {
      layout: {
        height: '100%',
        width: '100%',
        padding: '45px',
        backgroundColor: '#f1f1f1'
      }
    }
  )
)
// testdata
type Row = Record<string, string | string[]>
const cols = [
  { field: 'order', style: { minWidth: '250px' } },
  { field: '1753' },
  { field: '2732' },
  { field: '2733' },
  { field: '2734' },
  { field: '2735' },
  { field: '2736' },
  { field: '2737' },
  { field: '2738' },
  { field: '2739' },
  { field: '2740' },
  { field: '2741' },
  { field: '2742' },
  { field: '2743' },
  { field: '2744' },
  { field: '2745' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' },
  { field: '2746' }
]
const rows: Row[] = [
  {
    order: ['FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE'],
    1753: ['LATE', 'another', 'another2', 'another2', 'another2']
  },
  {
    order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
    2732: ['LATE']
  },
  {
    order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
    2733: ['LATE']
  },
  {
    order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
    2734: ['LATE']
  },
  {
    order: 'FSDAFWEIFEW-AJFAEÉFJAA-433434-FDSFDEDE',
    2735: ['LATE']
  }
]

const KittingDashboard: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.layout}>
        <DasboardDataMatrix rows={rows} columns={cols}/>
    </Box>
  )
}

export default KittingDashboard
