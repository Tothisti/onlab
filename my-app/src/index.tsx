import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import router from './app/router'
import { RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from './app/theme'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { persistor, store } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'

// import i18
import './app/i18/i18n'

import { create } from 'jss'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'

// need because npm link overrides my own styles
const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: document.getElementById('insertion-point') ?? ''
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <StylesProvider jss={jss}>
    <CssBaseline />
    <ThemeProvider theme={theme} >
      <Provider store={store}>
        <PersistGate loading={<div>LOADING</div>} persistor={persistor}>
          <SnackbarProvider maxSnack={3} >
            <RouterProvider router={router} />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StylesProvider>
)

reportWebVitals()
