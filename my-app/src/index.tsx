import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import router from './app/router'
import { RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from './app/theme'

// import i18
import './app/i18n'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)

reportWebVitals()
