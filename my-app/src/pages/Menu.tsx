import React from 'react'
import { Avatar, MenuItem, MenuList, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DashboardIcon from '@material-ui/icons/Dashboard'
import DnsIcon from '@material-ui/icons/Dns'
import MyLinkComponent from '../components/general/MyLinkComponent'
import Box from '@material-ui/core/Box'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) =>
  createStyles(
    {
      loginPanel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '70vh',
        maxWidth: '500px',
        maxHeight: '500px',
        minHeight: '300px',
        margin: '16px',
        padding: '16px'
      },
      form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      },
      textField: {
        width: '30ch'
      },
      menuBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '12px',
        gap: '12px'
      }
    }
  )
)

const Menu: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Paper className={classes.loginPanel} elevation={5}>
      <Box
        className={classes.menuBox}
      >
        <Avatar>
          <MenuIcon />
        </Avatar>
        <Typography
          variant='h1'
        >
          {t('menu')}
        </Typography>
      </Box>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <DashboardIcon fontSize='small' />
          </ListItemIcon>
          <MyLinkComponent
            to={'/kitting-dashboard'}>
            {t('kittingDashboard')}
          </MyLinkComponent>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DnsIcon fontSize='small' />
          </ListItemIcon>
          <MyLinkComponent
            to={'/kitting-maintance'}>
            {t('kitCartMaintance')}
          </MyLinkComponent>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

export default Menu
