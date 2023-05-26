/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useState, useMemo } from 'react'
import TextField from '@material-ui/core/TextField'
import { ClickAwayListener, Popper, createStyles, makeStyles } from '@material-ui/core'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) =>
  createStyles({
    rootDiv: {
      width: '350px',
      position: 'relative',
      display: 'inline-block',
      margin: '12px'
    },
    popper: {
      maxHeight: '200px',
      width: '350px',
      overflow: 'auto',
      position: 'absolute',
      zIndex: 9999,
      backgroundColor: theme.palette.neutral.n200,
      color: theme.palette.neutral.n100
    },
    paper: {
      backgroundColor: theme.palette.neutral.n700
    },
    listItem: {
      cursor: 'pointer',
      padding: '12px 0 12px 8px',
      '&:hover': {
        background: theme.palette.neutral.n900
      }
    }
  })
)

interface AutoCompleteTextFieldProps {
  values: string[] | null
  name: string
  label: string
  defaultValue?: string | null
  handleInputChange: (field: string, value: any) => any
}

const filterValues = (filterText: string | undefined, list: JSX.Element[] | undefined): JSX.Element[] => {
  const searchVar = typeof filterText === 'undefined'
    ? ''
    : filterText
  const res = _.filter(list, (item) => {
    return (item.props.children as string).startsWith(searchVar)
  })
  return res
}

const AutoCompleteTextField = (props: AutoCompleteTextFieldProps): JSX.Element => {
  const {
    values,
    name,
    label,
    defaultValue,
    handleInputChange
  } = props

  const classes = useStyles()
  const { t } = useTranslation()
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? '')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const jsxElementList = useMemo(() => values?.map((value, i) => {
    return (
      <div
        key={i}
        className={classes.listItem}
        onClick={() => { handleListItemClick(value) }}
      >{value}
      </div>
    )
  }
  ), [])
  const [filteredList, setFilteredList] = useState<JSX.Element[] | undefined>(jsxElementList)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setSelectedValue(event.target.value)
    handleInputChange(name, event.target.value)
    setFilteredList(filterValues(event.target.value, jsxElementList))
  }

  const handleListItemClick = (value: string): void => {
    setSelectedValue(value)
    handleInputChange(name, value)
    setFilteredList(filterValues(value, jsxElementList))
    setAnchorEl(null)
  }

  const handleClickOnTextField = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setAnchorEl(event.currentTarget)
    if (anchorEl === null) setFilteredList(filterValues(selectedValue, jsxElementList))
  }

  const handleClickAway = (): void => {
    if (anchorEl !== null) setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  return (
    <ClickAwayListener
      mouseEvent='onMouseDown'
      onClickAway={handleClickAway}
    >
      <div className={classes.rootDiv} aria-describedby={id}>
        <TextField
          name={name}
          label={label}
          defaultValue={selectedValue}
          value={selectedValue}
          onChange={handleChange}
          onClick={handleClickOnTextField}
          variant='outlined'
          type='search'
          fullWidth={true}
          error={filteredList?.length === 0}
          helperText={filteredList?.length === 0 ? t('autocompleteError') : ''}
        />
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement='bottom-start'
          className={classes.popper}
        >
          <div className={classes.paper}>
            {filteredList}
          </div>
        </Popper>
      </div >
    </ClickAwayListener>
  )
}

export default AutoCompleteTextField
